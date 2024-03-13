const mongoose = require('mongoose');
const blogModel = require('../Models/BlogModel');
const userModel = require('../Models/UserModel');

exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No blogs found"
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "All Blog list",
            blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get all blogs",
            error
        })
    }
}

exports.createBlogController = async (req, res) => {
    try {

        const { title, description, image, user } = req.body;
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "All Field is required"
            })
        }
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'unable to find user'
            });
        }

        const newBlog = new blogModel({ title, description, image, user })
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({ session })
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session })
        await session.commitTransaction();
        await newBlog.save();

        return res.status(201).send({
            success: true,
            message: "Blog post created Successfully",
            newBlog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in create blogs",
            error
        })
    }
}

exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).send({
            success: true,
            message: "Blog post updated Successfully",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in update blogs",
            error
        })
    }
}

exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(400).send({
                success: false,
                message: "Post not available"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Blog post fetched Successfully",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in single fetched blogs",
            error
        })
    }
}

exports.deleteBlogController = async (req, res) => {
    try {


        const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user')
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        if (!blog) {
            return res.status(400).send({
                success: false,
                message: "Post not Found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Blog post Deleted Successfully",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in  deleted blogs",
            error
        })
    }
}

exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs');
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "blogs not found with id"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User blogs",
            userBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "error in user blog",
            error
        })
    }
}