import express from 'express'
import { addProduct, deleteProduct, getFeaturedProducts, getProductById, getProductByIdWithCategory, getProductCount, getProducts, getProductsByCategory, getProductsWithCategory, updateProduct } from '../controller/product.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post("/add-product", auth ,addProduct)
router.get("/get-products", auth ,getProducts)
router.get("/get-product-by-id/:id", auth ,getProductById)
router.put("/update-product/:id", auth ,updateProduct)
router.delete("/delete-product/:id", auth ,deleteProduct)
router.get("/get-product-with-category", auth ,getProductsWithCategory)
router.get("/get-product-with-category/:id", auth ,getProductByIdWithCategory)
router.get("/get-product-count/:count", auth ,getProductCount)
router.get("/get-featured-products", auth ,getFeaturedProducts)
router.get("/get-product-by-category", auth ,getProductsByCategory)

export default router