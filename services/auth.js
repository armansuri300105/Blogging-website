import jwt from "jsonwebtoken"

const secretkey = "Ars12@#$%^&**&^%$"
export const setUser = (user,id) => {
    const payload = {
        _id: user._id,
        email: user.email,
        profile: user.profile,
        username: user.username,
        role: user.role
    }
    return jwt.sign(payload,secretkey)
}

export const getUser = (token) => {
    try {
        return jwt.verify(token,secretkey)
    } catch (error) {
        console.log("error: ",error.message);
    }
}