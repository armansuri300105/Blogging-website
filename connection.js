import mongoose from "mongoose"
export const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("mongodb Connected succefully");
    } catch (error) {
        console.log(error.message);
    }
}