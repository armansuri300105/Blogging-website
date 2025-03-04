import express from "express"
import {getlogin, getsignup, login, signup, home, logout, myblogs} from '../controllers/user.js'
const router = express.Router();

router.get('/', home)
router.get('/login', getlogin)
router.get('/signup', getsignup);
router.post('/login', login)
router.post('/signup', signup);
router.get('/logout', logout)
router.get('/myblogs', myblogs)

export default router