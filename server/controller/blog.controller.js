const Blog = require("../models/blog.model");
const cloudinary = require('../middleware/cloudinary.config')

let getBlog = async (req, res) => {

    try {
        let blog = await Blog.find({})

        res.status(200).json({
            message: "blog get successfully..",
            blog,
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Check if file is provided
        if (!req.file) {
            return res.status(400).json({ message: "No media file provided" });
        }

        // Upload file to Cloudinary based on file type
        let mediaType = req.file.mimetype.split('/')[0];  // Get the media type (e.g., image, video)
        let resourceType = mediaType === 'video' ? 'video' : 'image';  // Set to 'video' if the file is a video

        // Upload to Cloudinary
        let uploadedMedia = await cloudinary.uploader.upload(req.file.path, {
            resource_type: resourceType,  // Set the resource type (image/video)
            folder: 'blogs',  // Optional: Upload to a specific folder in Cloudinary
        });

        // Check if blog with the same title exists
        let findBlog = await Blog.findOne({ title });

        if (findBlog) {
            return res.status(401).json({ message: "This blog already exists" });
        }

        // Create a new blog post
        let blog = await Blog.create({
            title: title,
            media: uploadedMedia.secure_url,  // Media URL from Cloudinary
            description: description,
            public_id: uploadedMedia.public_id,  // Save public_id for future reference
        });

        res.status(201).json({
            message: "Blog created successfully...",
            blog,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


let deleteBlog = async (req, res) => {
    try {

        let { id } = req.params;

        let findBlog = await Blog.findById(id)
        if (!findBlog) {
            return res.status(401).json({ message: "blog are not found" })
        }   
        await cloudinary.uploader.destroy(findBlog.public_id);
        let blog = await Blog.findByIdAndDelete(id)

        res.status(200).json({
            message: "blog delete success",
            blog,
        }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// updateBlog
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;  // Blog ID from URL params
        const { title, description } = req.body;  // Get updated fields from request body

        let findBlog = await Blog.findById(id);
        if (!findBlog) {
            return res.status(404).json({ message: "Blog not found!" });
        }

        // Check if another blog with the same title already exists (excluding the current blog)
        let existingBlog = await Blog.findOne({ title, _id: { $ne: id } });
        if (existingBlog) {
            return res.status(400).json({ message: "Blog title already exists" });
        }

        if (req.file) {
            let findBlog = await Blog.findById(id);
            let mediaType = req.file.mimetype.split('/')[0];
            let resourceType = mediaType === 'video' ? 'video' : 'image';
            await cloudinary.uploader.destroy(findBlog.public_id);

            let uploadedMedia = await cloudinary.uploader.upload(req.file.path, {
                resource_type: resourceType,
            });

            // Update the blog in the database
            let blog = await Blog.findByIdAndUpdate(id, {
                title: title,
                media: uploadedMedia.secure_url,
                description: description,
                public_id: uploadedMedia.public_id,
            }, { new: true });
            res.status(200).json({
                message: "Blog updated successfully",
                blog,
            });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getBlog, createBlog, deleteBlog, updateBlog }