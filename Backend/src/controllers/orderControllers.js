import FlowApi from "flowcl-node-api-client"; // Importa la librería

// Configuración de Flow
const config = {
  apiKey: "6C0CF1FB-ECCE-4BE8-8228-2DL17F6412E2", // Asegúrate de que la API Key sea correcta
  secretKey: "085fd54aafe0b2d77ac053b8e9d6f4fb1a701f56", // Asegúrate de que la Secret Key sea correcta
  apiURL: 'https://sandbox.flow.cl/api', // URL base de la API
};

// Controlador para crear un pago
export const createPayment = async (req, res) => {
  try {
    const { monto, email } = req.body;

    if (!monto || !email) {
      return res.status(400).json({ error: 'Missing required payment data (monto and email)' });
    }

    // Prepara el arreglo de datos
    const params = {
      commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100, // Genera un número de orden aleatorio
      subject: 'Pago de prueba',
      currency: 'CLP',
      amount: parseFloat(monto), // Asegúrate de que el monto sea un número
      email,
      paymentMethod: 9, // Todos los métodos de pago
      urlConfirmation: `${config.apiURL}/payment_confirm`, // URL de confirmación
      urlReturn: `${config.apiURL}/retorno`, // URL de retorno
    };

    // Instancia la clase FlowApi
    const flowApi = new FlowApi(config);

    // Define el método a usar
    const serviceName = "payment/create";

    // Ejecuta el servicio
    let response = await flowApi.send(serviceName, params, "POST");

    // Prepara la URL para redireccionar el browser del pagador
    const redirect = `${response.url}?token=${response.token}`;

    // Responde con la URL de redirección
    res.status(200).json({ url: redirect });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Error al crear la orden' }); // Mensaje de error informativo
  }
};


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