const Product = require('../models/Product');

const addProduct = async (req, res) => {
  const { name, description, price, image, userId } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      userId
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { addProduct, getProducts };
