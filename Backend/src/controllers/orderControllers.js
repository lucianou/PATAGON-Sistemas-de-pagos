import https from 'https';
import crypto from 'crypto';
import { pool } from '../middleware/authenticateDB.js';

/**
 * Función para firmar los parámetros
 * @param {Object} params - Parámetros a firmar
 * @param {string} secretKey - Clave secreta para la firma
 * @returns {string} - La firma generada
 */
function signParameters(params, secretKey) {
    const orderedParams = Object.keys(params)
        .sort()
        .map((key) => `${key}${params[key]}`)
        .join('');
    return crypto.createHmac('sha256', secretKey).update(orderedParams).digest('hex');
}

export const createPayment = async (req, res) => {
    const { monto, ordenCompra, email } = req.body;

    // Verificar que se han recibido todos los parámetros necesarios
    if (!monto || !ordenCompra || !email) {
        return res.status(400).json({ message: 'Faltan parámetros necesarios' });
    }

    // Guardar la orden en la base de datos
    const insertOrderQuery = `
        INSERT INTO public."orders" (commerce_order, email, amount)
        VALUES ($1, $2, $3);
    `;
    await pool.query(insertOrderQuery, [ordenCompra, email, monto]);

    const apiKey = '1F0DD4BE-CD53-4C89-97E8-8D27475AL2E0';
    const apiSecret = '1ffdf7d2cfbc068ddf871c058864ce00ab95c9da';

    // Crear los datos del pago
    const paymentData = {
        commerceOrder: ordenCompra,
        subject: 'Compra en Mi Tienda',
        amount: monto,
        currency: 'CLP',
        email: email,
        urlReturn: 'https://localhost:4003/retorno',
        urlConfirmation: 'https://localhost:3003/api/command/confirmacion',
    };

    // Firmar los parámetros
    const signature = signParameters(paymentData, apiSecret);
    console.log('Signature:', signature); // Depuración

    // Crear el objeto de datos a enviar a Flow
    const data = JSON.stringify({
        ...paymentData,
        s: signature,
        apiKey: apiKey,
    });

    const options = {
        hostname: 'sandbox.flow.cl',
        port: 443,
        path: '/api/payment/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };

    // Realizar la solicitud a la API de Flow
    const reqApi = https.request(options, (response) => {
        let responseBody = '';

        response.on('data', (chunk) => {
            responseBody += chunk;
        });

        response.on('end', () => {
            try {
                const responseData = JSON.parse(responseBody);
                console.log('Respuesta de Flow:', responseData); // Depuración
                res.json({ urlPago: responseData.urlPago });
            } catch (error) {
                console.error('Error al procesar la respuesta de Flow:', error);
                res.status(500).json({ error: 'Error al procesar la respuesta de Flow' });
            }
        });
    });

    reqApi.on('error', (error) => {
        console.error('Error en la solicitud a la API de Flow:', error);
        res.status(500).json({ error: 'Error al generar la orden' });
    });

    reqApi.write(data);
    reqApi.end();
};

export const confirmPayment = async (req, res) => {
    const { commerceOrder, status, signature } = req.body;

    // Validar la firma que envía Flow
    const stringToSign = `${commerceOrder}|${status}`;
    const calculatedSignature = crypto
        .createHmac('sha256', process.env.FLOW_SECRET_KEY)
        .update(stringToSign)
        .digest('hex');

    if (signature !== calculatedSignature) {
        console.log('Firma no válida, posible intento de fraude.');
        return res.status(400).json({ message: 'Firma no válida' });
    }

    // Verificar si el pago fue exitoso
    if (status === 'paid') {
        try {
            // Obtener el correo y el monto asociado a la orden de compra
            const orderQuery = `
                SELECT email, amount FROM public."orders" WHERE commerce_order = $1;
            `;
            const orderResult = await pool.query(orderQuery, [commerceOrder]);

            if (orderResult.rows.length === 0) {
                return res.status(400).json({ message: 'Orden no encontrada' });
            }

            const { email, amount } = orderResult.rows[0];

            // Guardar la transacción en la base de datos
            const transactionQuery = `
                INSERT INTO public."transactions" (email, commerce_order, amount, status)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const transactionValues = [email, commerceOrder, amount, status];

            const transactionResult = await pool.query(transactionQuery, transactionValues);

            console.log(`Orden ${commerceOrder} pagada por ${amount}`);
            // Redirigir al cliente a la URL de retorno con el estado de la compra
            const returnUrl = `https://localhost:4003/retorno?status=success&commerceOrder=${commerceOrder}`;
            res.redirect(returnUrl); // Redirige al frontend con el estado de éxito

        } catch (error) {
            console.error('Error al guardar la transacción en la base de datos:', error);
            res.status(500).json({ message: 'Error al procesar el pago' });
        }
    } else {
        console.log(`El pago de la orden ${commerceOrder} no fue exitoso.`);
        // Redirigir al cliente a la URL de retorno con el estado de error
        const returnUrl = `https://localhost:4003/retorno?status=error&commerceOrder=${commerceOrder}`;
        res.redirect(returnUrl); // Redirige al frontend con el estado de error
    }
};
