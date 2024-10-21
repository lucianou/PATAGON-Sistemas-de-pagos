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
};
