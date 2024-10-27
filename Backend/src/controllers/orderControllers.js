import axios from 'axios';
import CryptoJS from 'crypto-js';

// Configuración de las credenciales y URL base
const apiKey = "6C0CF1FB-ECCE-4BE8-8228-2DL17F6412E2";
const secretKey = "085fd54aafe0b2d77ac053b8e9d6f4fb1a701f56";
const FLOW_BASE_URL = "https://sandbox.flow.cl/api";

function signParameters(params, secretKey) {
  const orderedParams = Object.keys(params).sort().map(key => `${key}${params[key]}`).join('');
  return CryptoJS.HmacSHA256(orderedParams, secretKey).toString();
}

// Controlador para crear un pago
export const createPayment = async (req, res) => {
  try{
    const { monto, email } = req.body;
    const orderNumber = Date.now().toString(); // Generar un número de orden único

    const paymentData = {
      apiKey: apiKey,
      commerceOrder: orderNumber,
      subject: "Compra en mi tienda",
      currency: "CLP",
      amount: monto,
      email: email,
      paymentMethod: 9, 
      urlConfirmation: `http://localhost:3003/api/command/confirm-payment`,
      urlReturn: `http://localhost:4003/dashboard`
    };

    const paymentDataString = JSON.stringify(paymentData);
    const signature = signParameters(paymentData, secretKey);

    const response = await axios.post(`${FLOW_BASE_URL}/payment/create`, paymentDataString, {
      ...paymentData,
      s: signature
    });

    const paymentUrl = response.data.url;

    res.status(200).json({ url: paymentUrl });
  }catch (error) {
    console.error('Error al crear la orden:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
}
  

// Controlador para confirmar el pago
export const confirmPayment = async (req, res) => {
  const { token, s } = req.query;

  try {
    const response = await axios.get(`${FLOW_BASE_URL}/payment/status`, {
      params: {
        apiKey: apiKey,
        token: token,
        s: s,
      }
    });

    const { status, commerceOrder } = response.data;

    if (status === 2) {
      console.log(`Orden ${commerceOrder} pagada exitosamente`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error al confirmar el pago:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al confirmar el pago' });
  }
};