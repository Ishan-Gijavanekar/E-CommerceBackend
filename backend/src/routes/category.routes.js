import express from 'express'
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controller/category.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.post("/add-category", auth ,addCategory)
router.delete("/delete-category/:id", auth ,deleteCategory)
router.get("/all-categories", auth ,getAllCategories)
router.get("/get-category-by-id/:id", auth ,getCategoryById)
router.put("/upadate-category/:id", auth ,updateCategory)

export default router;