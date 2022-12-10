const express = require("express")
const router = express.Router()
const Order = require("../models/order")

// Creating one
router.post("/", async (req, res) => {
  const { productList, firstName, lastName, totalAmount } = req.body
  const order = new Order({
    user: { firstName, lastName },
    totalAmount,
    products: productList,
  })
  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
