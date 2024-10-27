import Bag from "../models/bags.js";

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