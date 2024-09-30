let express = require("express");
let routes = express.Router();
let userRoute = require("./user.route")
let blogRoute = require("./blog.route")

routes.use("/user", userRoute);
routes.use("/blog", blogRoute);

module.exports = routes;