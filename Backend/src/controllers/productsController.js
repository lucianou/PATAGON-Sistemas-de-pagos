import Bag from "../models/bags.js";
import User from "../models/user.js";

//obtener los productos, bolsas de tiempo
export async function getProducts(req, res) {
  try {
    const products = await Bag.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
}

//obtener un producto por ID
export async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const product = await Bag.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

export async function getTimeRemaining(req, res) {
  const email = req.query.email;
  //obtener el time_remaining de la cuenta
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    //enviar horas y username
    res.json({ time_remaining: user.hours_remaining, username: user.username });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}