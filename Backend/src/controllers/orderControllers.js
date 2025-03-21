import axios from "axios";
import Orders from "../models/transactions.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_API_KEY = process.env.PAYPAL_API_KEY;
const PAYPAL_API = "https://api-m.sandbox.paypal.com";
const ip_server = process.env.IP_SERVER;
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
const SECRET_KEY = process.env.SECRET_KEY;


// Controlador para crear un pago PayPal
export const createPayment = async (req, res) => {
  const {email, precio, id, time} = req.body;
  
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
        return_url: `http://${ip_server}:3003/api/command/confirm-payment?email=${email}&time=${time}`,
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
    
    //guardar en la base de datos
    const orderData = {
      order_id: response.data.id,
      user_email: email,
      payment_method: "PayPal",
      amount: parseFloat(precio),
      currency: "USD",
      status: "Creado",
      created_at: new Date(),
      id_product: id,
      time: time,
    };

    await Orders.create(orderData);
    console.log("Orden creada en PayPal y guardada en BD");


    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
};

// Controlador para confirmar el pago
export const confirmPayment = async (req, res) => {
  const { token } = req.query;
  const email = req.query.email;
  const time = req.query.time;
  const verifyToken = jwt.sign({ email, time }, SECRET_KEY, { expiresIn: '1m' });

  
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

    const { id: orderId, status } = response.data;
    console.log(`Orden ${orderId} capturada en PayPal con estado: ${status}`);

    //actualizar en la base de datos
    if (status === "COMPLETED") {
      await Orders.update(
        { status: "Pagado", updated_at: new Date() },
        { where: { order_id: orderId } }
      )
      await User.increment(
        { hours_remaining: time },
        { where: { email } }
      );
    };
    
    res.redirect(`http://${ip_server}:4003/paymentaccept?verifyToken=${verifyToken}`);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//controlador para cancelar un pago
export const cancelPayment = async (req, res) => {
 
  try {
      await Orders.update(
          { status: "Cancelado", updated_at: new Date() }, 
          { where: { order_id: req.query.token } }
      );

      console.log(`Orden ${req.query.token} ha sido cancelada y su estado actualizado a "Cancelado"`);

  
      res.redirect(`http://${ip_server}:4003/mainClient`);
  } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal Server error" });
  }
};


//controlador para crear un pago MercadoPago
export const createOrderMercadoPago = async (req, res) => {
  const {email, precio, id, time} = req.body;
  const order = new Date().getTime();
  const verifyToken = jwt.sign({ email, time }, SECRET_KEY, { expiresIn: '1m' });

  try {
    const payload = {
      items: [
        {
          title: `Patagon arriendo bolsa ${id}`,
          description: email,
          unit_price: Number(precio),
          currency_id: "CLP",
          quantity: 1,
        },
      ],
      metadata: {email, order},
      notification_url: `https://rx84cmhh-3003.brs.devtunnels.ms/api/command/webhook?email=${email}&time=${time}`,
      // notification_url: `http://${ip_server}:3003/api/command/webhook?email=${email}&time=${time}`,
      back_urls: {
        success: `http://${ip_server}:4003/paymentaccept?verifyToken=${verifyToken}`,
        failure: `http://${ip_server}:4003/mainClient`,
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

    //guardar en la base de datos
    const orderData = {
      //crear id de orden segun fecha y hora
      order_id: order,
      user_email: email,
      payment_method: "MercadoPago",
      amount: parseFloat(precio),
      currency: "CLP",
      status: "Creado",
      created_at: new Date(),
      id_product: id,
      time: time,
    };

    await Orders.create(orderData);
    console.log("Orden creada en mercadopago y guardada en BD");

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
    const email = req.query.email;
    const time = req.query.time;
    //console.log("Webhook recibido:", payment);

    if (payment.type === "payment") {
      // Realiza una llamada a la API de MercadoPago para obtener los detalles del pago
      const paymentId = payment["data.id"];
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        }
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud a MercadoPago: ${response.statusText}`);
      }
      const data = await response.json();
     
      //actualizar en la base de datos
      if (data.status === "approved") {
        await Orders.update(
          { status: "Pagado", updated_at: new Date() , order_id: paymentId},
          { where: { order_id: data.metadata.order } },
        )
        await User.increment(
          { hours_remaining: time },
          { where: { email } }
        );
      };
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error al procesar el webhook:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



//boletas para paypal
export const getReceipt = async (req, res) => {
  const { orderId } = req.params;
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
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
    const response = await axios.get(
      `${PAYPAL_API}/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    
    const orderDetails = response.data;
    const receipt = {
      orderId: orderDetails.id,
      status: orderDetails.status,
      payer: orderDetails.payer.email_address,
      amount: orderDetails.purchase_units[0].amount.value,
      currency: orderDetails.purchase_units[0].amount.currency_code,
      createdAt: orderDetails.create_time,
      capturedAt: orderDetails.update_time,
    };

    return res.json({ receipt });
  } catch (error) {
    console.error("Error al obtener los detalles del pago:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const validateToken = (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ isValid: true, data: decoded });
  } catch (error) {
    res.json({ isValid: false });
  }
};