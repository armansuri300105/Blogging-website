import { BLOGS } from "../models/blogs.js"
import { getUser } from "../services/auth.js";
import { USER } from "../models/user.js"
import mongoose from "mongoose"

export const addblogs = async (req,res) => {
    try {
        const token = req.cookies?.sessionToken;
        if (!token) return res.redirect("/login");
        const user = getUser(token);
        const {title,description,type} = req.body;
        if (!title || !description){
            return res.redirect("/blogs")
        }
        const blog = await BLOGS.create({
            type,
            title,
            description,
            createdBy: user._id
        })
        return res.redirect("/blogs")
    } catch (error) {
        console.log("error", error.message)
    }
}

export const blogs = (req,res) => {
    try {
        const token = req.cookies?.sessionToken;
        if (!token) return res.redirect("/login")
        const user = getUser(token)
        const username = user
        res.render("addblogs", {username})
    } catch (error) {
        res.json({error: "unknown error"})
    }
}

export const read = async (req,res) => {
    try {  
        const _id = req.params.id;
        let blog;
        let user;
        if (mongoose.Types.ObjectId.isValid(_id)) {
            blog = await BLOGS.findOne({ _id });
            const updatedviews = blog.views+1;
            await BLOGS.updateOne({_id}, {views: updatedviews})
            user = await USER.findOne({_id: blog.createdBy})
        } else {
            console.log("Invalid ObjectId:", _id);
        }
        const createdBy = user.username
        if (!blog) return res.redirect("/")
        const token = req.cookies?.sessionToken;
        if (!token) return res.render("blogpage",{createdBy, blog})
        else { 
            const username = getUser(token)
            return res.render("blogpage",{createdBy, username,  blog})
        }
    } catch (error) {
        res.json({error: "Blog Not available"})
    }
}

export const addcomment = async (req,res) => {
    try {
        const token = req.cookies?.sessionToken;
        if (!token) return res.redirect("/login")
        const user = getUser(token)
        const _id = req.params.id;
        const username = user.username;
        const profile = user.profile;
        const {content} = req.body;
        const blog = await BLOGS.findOneAndUpdate({_id}, {$push: { comments: { user: username, content, profile } }}, {new: true})
        res.redirect(`/blogs/read/${_id}`)
    } catch (error) {
        res.json({error: "unable to add comment"})
    }
}

export const deletecomment = async (req,res) => {
    try {
        const token = req.cookies?.sessionToken;
        if (!token) return res.redirect("/login")
        const _id = req.params.id;
        const {commentId} = req.body
        await BLOGS.updateOne({_id}, { $pull: { comments: { _id: commentId } } })
        res.redirect(`/blogs/read/${_id}`)
    } catch (error) {
        res.json({error: "unable to delete the comment"})
    }
}

export const deletblog = async (req,res) => {
    try {
        const token = req.cookies?.sessionToken;
        if (!token) return res.redirect("/login")
        const _id = req.params.id;
        await BLOGS.deleteOne({_id});
        res.redirect("/");
    } catch (error) {
        res.json({error: "unable to delete this blog"})
    }
}