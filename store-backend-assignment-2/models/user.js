const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
})

const User = mongoose.model("Users", userSchema)
module.exports = { User, userSchema }
