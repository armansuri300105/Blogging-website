import { createHmac } from "crypto"
import { USER } from "../models/user.js"
import  { getUser, setUser } from "../services/auth.js"
import { BLOGS } from "../models/blogs.js";

export const home = async (req,res) => {
    const blogs = await BLOGS.find({type: "public"})
    blogs.sort((a,b) => b.views - a.views);
    const token = req.cookies?.sessionToken;
    if (!token) return res.render("home", {blogs})
    const user = getUser(token)
    const username = user
    return res.render("home", {blogs, username})
}
export const myblogs = async (req,res) => {
    const token = req.cookies?.sessionToken;
    if (!token) return res.redirect("/login")
    const user = getUser(token)
    const username = user
    const blogs = await BLOGS.find({createdBy: user._id})
    return res.render("home", {blogs, username})
}

export const getlogin = (req,res) => {
    return res.render("login")
}
export const getsignup = (req,res) => {
    return res.render("signup")
}
export const login = async (req,res) => {
    const {username, password} = req.body
    if (!username || !password) return res.redirect("/login");
    const user = await USER.findOne({username});
    if (!user) return res.render("login", {error: {notfound: "User Not Found"}})
    else if (user.username===username){
        const saltkey = user.salt;
        const hashedPassword = createHmac("sha256", saltkey)
        .update(password)
        .digest("hex");
        if (user.password===hashedPassword){
            const token = setUser(user);
            res.cookie("sessionToken", token);
            return res.redirect("/")
        }
        else return res.render("login", {error: {wrongpassword: "Incorrect Password"}})
    }
}
export const signup = async (req,res) => {
    const {name,username,email,password} = req.body;
    if (!username || !password || !email || !name ) return res.redirect("/signup");
    const user = await USER.create({
        name,
        username,
        email,
        password,
    })

    return res.redirect("/login")
}

export const logout = (req,res) => {
    res.clearCookie("sessionToken");
    res.redirect("/login");
}