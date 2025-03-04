import mongoose from "mongoose"

const blogsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdBy: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    comments: [
        {
            profile: {type: String, required: true},
            user: { type: String, required: true },
            content: { type: String, required: true }
        }
    ]
})

export const BLOGS = mongoose.model("blog", blogsSchema)