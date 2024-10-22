import https from 'https';
import crypto from 'crypto';
import { pool } from '../middleware/authenticateDB.js';

export const crearOrden = async (req, res) => {
  const { monto, ordenCompra, email } = req.body;

  // Guardar la orden en la base de datos
    const insertOrderQuery = `
    INSERT INTO orders (commerce_order, email, amount)
    VALUES ($1, $2, $3);
  `;
  await pool.query(insertOrderQuery, [ordenCompra, email, monto]);


  const data = JSON.stringify({
    apiKey: process.env.FLOW_API_KEY,
    apiSecret: process.env.FLOW_SECRET_KEY,
    commerceOrder: ordenCompra,
    subject: 'Compra en Mi Tienda',
    amount: monto,
    email: email,
    urlReturn: 'https://localhost:4003/retorno',  // URL de retorno al frontend después del pago
    urlConfirmation: 'https://localhost:3003/api/command/confirmacion' // URL de confirmación al backend
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

  const reqApi = https.request(options, (response) => {
    let responseBody = '';

    response.on('data', (chunk) => {
      responseBody += chunk;
    });

    response.on('end', () => {
      try {
        const responseData = JSON.parse(responseBody);
        res.json({ urlPago: responseData.urlPago });
      } catch (error) {
        res.status(500).json({ error: 'Error al procesar la respuesta de Flow' });
      }
    });
  });

  reqApi.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Error al generar la orden' });
  });

  reqApi.write(data);
  reqApi.end();
};




export const confirmarPago = async (req, res) => {
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
        SELECT email, amount FROM orders WHERE commerce_order = $1;
      `;
      const orderResult = await pool.query(orderQuery, [commerceOrder]);

      if (orderResult.rows.length === 0) {
        return res.status(400).json({ message: 'Orden no encontrada' });
      }

      const { email, amount } = orderResult.rows[0];

      // Guardar la transacción en la base de datos
      const transactionQuery = `
        INSERT INTO transactions (email, commerce_order, amount, status)
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
