const mongoose = require("mongoose")

// connection string
mongoose.connect("mongodb://127.0.0.1:27017/bankServer", { useNewUrlParser: true })

// model creation
// schema means field and vlues
const User = mongoose.model("User",
    {
        username: String,
        acno: Number,
        password: String,
        balance: Number,
        transactions: []
    })


module.exports = {
    User
}