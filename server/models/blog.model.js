let mongoose = require("mongoose")

let blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    media: {
        type: String,
        // enum: ['image', 'url', 'gif', 'video'],
    },
    description: {
        type: String,
    },
    public_id: {
        type: String,
    }
})

let Blog = mongoose.model("blogs", blogSchema)

module.exports = Blog;