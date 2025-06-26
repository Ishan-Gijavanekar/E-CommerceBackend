import express from 'express'
import { addProduct, deleteProduct, getFeaturedProducts, getProductById, getProductByIdWithCategory, getProductCount, getProducts, getProductsByCategory, getProductsWithCategory, updateProduct } from '../controller/product.controller.js'

const router = express.Router()

router.post("/add-product", addProduct)
router.get("/get-products", getProducts)
router.get("/get-product-by-id/:id", getProductById)
router.put("/update-product/:id", updateProduct)
router.delete("/delete-product/:id", deleteProduct)
router.get("/get-product-with-category", getProductsWithCategory)
router.get("/get-product-with-category/:id", getProductByIdWithCategory)
router.get("/get-product-count/:count", getProductCount)
router.get("/get-featured-products", getFeaturedProducts)
router.get("/get-product-by-category", getProductsByCategory)

export default router