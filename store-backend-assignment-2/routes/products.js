const express = require("express")
const router = express.Router()
const { Product } = require("../models/product.js")

// Getting all
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: "messageggeg" })
  }
})

module.exports = router
