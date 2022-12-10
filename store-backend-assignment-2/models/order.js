const mongoose = require("mongoose")
const { userSchema } = require("./user")
const { productSchema } = require("./product")

const orderSchema = new mongoose.Schema({
  user: userSchema,
  totalAmount: {
    type: Number,
    require: true,
    min: 0,
  },
  products: [productSchema],
})

const Order = mongoose.model("Orders", orderSchema)
module.exports = Order
