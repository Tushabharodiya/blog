let express = require("express");
const validate = require("../middleware/validate");
const { user } = require("../validation/user.validation");
const { userRegister, userLogin } = require("../controller/user.controller");
let route = express.Router();

route.post("/register", validate(user), userRegister);
route.post("/login", userLogin);

module.exports = route;