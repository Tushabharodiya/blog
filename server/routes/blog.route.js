let express = require("express");
const { getBlog, createBlog, deleteBlog, updateBlog } = require("../controller/blog.controller");
const validate = require("../middleware/validate");
const { blog } = require("../validation/blog.validation");
let route = express.Router();
const multer = require('multer');
const { isAdmin, verifyToken } = require("../middleware/auth");
const storage = multer.diskStorage({});
const upload = multer({ storage: storage }).single('media');


route.get("/getblog", verifyToken(["user", "admin"]), getBlog);
route.post("/createblog", verifyToken(["admin"]), upload, validate(blog), createBlog);
route.delete("/deleteblog/:id",verifyToken(["admin"]),  deleteBlog);
route.put("/updateblog/:id",verifyToken(["admin"]),  upload, validate(blog), updateBlog);

module.exports = route;