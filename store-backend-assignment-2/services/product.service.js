const products = require("../data/products.json")
const { Product } = require("../models/product.js")

const setUpDb = () => {
  Product.deleteMany(
    {},
    (res) => {
      console.log(res)
    },
    (e) => {
      console.log(e)
    }
  )
  Product.insertMany(products)
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e)
    })
}

module.exports = { setUpDb }
