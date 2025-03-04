import  { getUser } from "../services/auth.js"

export const adminpannel = async (req,res) => {
    const token = req.cookies?.sessionToken;
    if (!token) return res.redirect("/login")
    const user = getUser(token)
    const username = user.username
    res.render("adminpannel", {username})
}