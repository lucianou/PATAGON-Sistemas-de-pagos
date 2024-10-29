import axios from "axios";


const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_API_KEY = process.env.PAYPAL_API_KEY;
const PAYPAL_API = "https://api-m.sandbox.paypal.com";
const IP_SERVER = process.env.IP_SERVER;



// Controlador para crear un pago PayPal
export const createPayment = async (req, res) => {
  const {email, precio} = req.body;
  // console.log(email)
  // console.log(precio)

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
        description: "Pago de bolsa patagon",
        brand_name: "Patagon arriendos",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://${IP_SERVER}:3003/api/command/confirm-payment`,
        cancel_url: `http://${IP_SERVER}:3003/api/command/cancel-payment`,
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

    res.redirect(`http://${IP_SERVER}:4003/paymentaccept`)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};


//controlador para cancelar un pago
export const cancelPayment = (req, res) => res.redirect(`http://${IP_SERVER}:4003/dashboard`); 

