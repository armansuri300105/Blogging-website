import express from "express"
import { addblogs, blogs, read, addcomment, deletecomment, deletblog } from "../controllers/blogs.js";
const router = express.Router();

router.get('/', blogs);
router.delete('/:id', deletblog);
router.get('/read/:id', read)
router.post('/comment/:id', addcomment)
router.delete('/comment/:id', deletecomment)
router.post('/add', addblogs)

export default router