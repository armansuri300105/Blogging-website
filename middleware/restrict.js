import  { getUser } from "../services/auth.js"

export const restrictUser = (req,res,next) => {
    const token = req.cookies?.sessionToken;
    const user = getUser(token);
    if (!user) return res.redirect("/login")
    
    req.user = user;
    next();
}

export const restrictTo = (roles = []) => {
    return (req,res,next) => {
        const role = req.user.role;
        if (!roles.includes(role)) return res.redirect("/")
        next();
    }
}