<<<<<<< Updated upstream
import https from 'https';

export const crearOrden = (req, res) => {
  const { monto, ordenCompra, email } = req.body;

  const data = JSON.stringify({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.SECRET_KEY,
    commerceOrder: ordenCompra,
    subject: 'Compra en Mi Tienda',
    amount: monto,
    email: email,
    urlReturn: 'https://tuapp.com/retorno',
    urlConfirmation: 'https://tuapp.com/confirmacion'
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
      const responseData = JSON.parse(responseBody);
      res.json({ urlPago: responseData.urlPago });
    });
  });

  reqApi.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Error al generar la orden' });
  });

  reqApi.write(data);
  reqApi.end();
=======
import axios from 'axios';
import crypto from 'crypto';

// Configuración de las credenciales y URL base
const FLOW_API_KEY = process.env.FLOW_API_KEY;
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY;
const FLOW_BASE_URL = "https://sandbox.flow.cl/api/payment/create";

// Función para crear la firma (sign)
function createSignature(params, secretKey) {
  const keys = Object.keys(params).sort();
  const signString = keys.map(key => `${key}=${params[key]}`).join('&');
  return crypto.createHmac('sha256', secretKey).update(signString).digest('hex');
}

// Controlador para crear un pago
export const createPayment = async (req, res) => {
  const { monto, email } = req.body;
  const orderNumber = Date.now().toString(); // Generar un número de orden único

  // Parámetros requeridos para la creación de la orden
  const paymentData = {
    apiKey: FLOW_API_KEY,
    commerceOrder: orderNumber,
    subject: "Compra en mi tienda",
    currency: "CLP",
    amount: monto,
    email: email,
    paymentMethod: 9, // Todos los medios de pago
    urlConfirmation: `http://localhost:3003/api/command/confirm-payment`, // Reemplazar con la URL pública en producción
    urlReturn: `http://localhost:4003/dashboard`, // Reemplazar con la URL pública en producción
  };

  // Crear la firma (s) usando los parámetros
  const signature = createSignature(paymentData, FLOW_SECRET_KEY);
  
  // Añadir la firma a los datos de la orden
  paymentData.s = signature;

  try {
    // Realiza la petición a la API de Flow usando application/x-www-form-urlencoded
    const response = await axios.post(`${FLOW_BASE_URL}`, new URLSearchParams(paymentData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    // Enviar la URL de pago con el token al frontend
    const { url, token } = response.data;
    const paymentUrl = `${url}?token=${token}`;

    res.json({ url: paymentUrl });
  } catch (error) {
    console.error('Error al crear la orden:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
};




// Controlador para confirmar el pago
export const confirmPayment = async (req, res) => {
  const { token, s } = req.query;

  // Aquí deberías verificar la firma y realizar la lógica de confirmación
  try {
    // Llamar a la API de Flow para obtener el estado de la transacción
    const response = await axios.get(`${FLOW_BASE_URL}/payment/status`, {
      params: {
        apiKey: FLOW_API_KEY,
        token: token,
        s: s, // Incluir la firma calculada con los parámetros de la transacción
      }
    });

    const { status, commerceOrder } = response.data;

    if (status === 2) { // Pago exitoso
      // Actualizar la base de datos o tomar acciones necesarias
      console.log(`Orden ${commerceOrder} pagada exitosamente`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error al confirmar el pago:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al confirmar el pago' });
  }
>>>>>>> Stashed changes
};
