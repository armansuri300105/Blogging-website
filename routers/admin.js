import express from "express"
import { adminpannel } from "../controllers/admin.js";
const router = express.Router();

router.get('/', adminpannel)

export default router