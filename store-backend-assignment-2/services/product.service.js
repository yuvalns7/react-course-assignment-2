const products = require("../data/products.json")
const { Product } = require("../models/product.js")

const setUpDb = () => {
  Product.deleteMany({})
  Product.insertMany(products)
}

module.exports = { setUpDb }
