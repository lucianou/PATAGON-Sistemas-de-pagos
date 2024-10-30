import axios from "axios";
import mercadopago from "mercadopago";


const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_API_KEY = process.env.PAYPAL_API_KEY;
const PAYPAL_API = "https://api-m.sandbox.paypal.com";
const ip_server = process.env.IP_SERVER;
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

// Controlador para crear un pago PayPal
export const createPayment = async (req, res) => {
  const {email, precio} = req.body;
  console.log(email);
  console.log(precio);


  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: precio,
          },
        },
      ],
      application_context: {
        brand_name: "Patagon arriendos",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://${ip_server}:3003/api/command/confirm-payment`,
        cancel_url: `http://${ip_server}:3003/api/command/cancel-payment`,
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Generar acces token
    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_API_KEY,
        },
      }
    );

    console.log(access_token);

    // make a request
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(response.data);

    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
};

// Controlador para confirmar el pago
export const confirmPayment = async (req, res) => {
  const { token } = req.query;

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_API_KEY,
        },
      }
    );

    console.log(response.data);

    res.redirect(`http://${ip_server}:4003/dashboard`)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//controlador para cancelar un pago
export const cancelPayment = (req, res) => res.redirect(`http://${ip_server}:4003/paymentaccept`);



//controlador para crear un pago MercadoPago
export const createOrderMercadoPago = async (req, res) => {
  try {
   
    // Define el payload de la orden de pago
    const payload = {
      items: [
        {
          title: "Patagon arriendos",
          unit_price: 1000,
          currency_id: "CLP",
          quantity: 1,
        },
      ],
      notification_url: "https://rx84cmhh-3003.brs.devtunnels.ms/api/command/webhook",
      back_urls: {
        success: "http://localhost:4003/paymentaccept",
        //failure: "http://localhost:3000/api/commmand/failure",
        //pending: "http://localhost:3000//api/commmand/pending",
      },
      auto_return: "approved",
    };

    // Configuración de la solicitud con axios
    const response = await axios.post(
      "https://api.mercadopago.com/checkout/preferences",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Muestra en consola el objeto de respuesta completo
    console.log("Respuesta de Mercado Pago:", response.data);

    // Responde con el link de pago
    res.json({ init_point: response.data.init_point });
  } catch (error) {
    // Muestra en consola el error completo si ocurre algún problema
    console.error("Error al crear la orden de Mercado Pago:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error al crear la orden de pago" });
  }
};


export const webhookMercadoPago = async (req, res) => {
  try {
    const payment = req.query;
    console.log("Webhook recibido:", payment);

    if (payment.type === "payment") {
      // Realiza una llamada a la API de MercadoPago para obtener los detalles del pago
      const paymentId = payment["data.id"];
      
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Reemplaza con tu token de acceso
        }
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud a MercadoPago: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Detalles del pago:", data);
    }

    res.sendStatus(204); 
  } catch (error) {
    console.error("Error al procesar el webhook:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};