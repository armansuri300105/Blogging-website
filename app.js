import express from "express"
import path from "path"
import cookieParser from "cookie-parser";
import methodOverride from "method-override"
import 'dotenv/config'
import { connectDB } from "./connection.js";
import blogs from "./routers/blogs.js"
import user from "./routers/user.js"
import admin from "./routers/admin.js"
import { restrictUser, restrictTo } from "./middleware/restrict.js";
const app = express();
const PORT = process.env.PORT || 8000;

connectDB(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"))
app.use(express.json());


app.use('/', user);
app.use('/blogs', blogs)
app.use(restrictUser);
app.use('/admin', restrictTo(["ADMIN"]), admin)

app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
})