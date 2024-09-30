let mongoose = require("mongoose")


let dbConnect = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("database connect suuccess");
    })
        .catch((err) => {
            console.log(err, "err form db connention");
        })
}

module.exports = dbConnect;