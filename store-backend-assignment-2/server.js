const express = require("express")
const app = express()

const cors = require("cors")
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

const mongoose = require("mongoose")
const productService = require("./services/product.service")

mongoose.connect("mongodb://localhost/shopping-store", {
  useNewUrlParser: true,
})

const db = mongoose.connection
db.on("error", (err) => {
  console.error(err)
})
db.once("open", (err) => {
  console.log("connected to DB")
})

app.use(express.json())

const productsRouter = require("./routes/products")
app.use("/products", productsRouter)
const ordersRouter = require("./routes/orders")
app.use("/orders", ordersRouter)

productService.setUpDb()

app.listen(3000, () => console.log("server start"))
