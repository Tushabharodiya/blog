let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmpassword: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
}, { timestamps: true })

let User = mongoose.model("users", userSchema)

module.exports = User;