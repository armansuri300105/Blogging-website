import mongoose from "mongoose"
import {createHmac, randomBytes} from "crypto"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true,
        default: "A"
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: "/default.jpg"
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL"
    },
})
userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const saltkey = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", saltkey)
        .update(user.password)
        .digest("hex");
    
    user.salt = saltkey;
    user.password = hashedPassword;

    next();
})

export const USER = mongoose.model("user", userSchema);