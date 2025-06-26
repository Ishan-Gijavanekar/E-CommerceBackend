import express from 'express'
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controller/category.controller.js';

const router = express.Router()

router.post("/add-category", addCategory)
router.delete("/delete-category/:id", deleteCategory)
router.get("/all-categories", getAllCategories)
router.get("/get-category-by-id/:id", getCategoryById)
router.put("/upadate-category/:id", updateCategory)

export default router;