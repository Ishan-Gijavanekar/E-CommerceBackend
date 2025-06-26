import express from 'express'
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/product.controller.js'

const router = express.Router()

router.post("/add-product", addProduct)
router.get("/get-products", getProducts)
router.get("/get-product-by-id/:id", getProductById)
router.put("/update-product/:id", updateProduct)
router.delete("/delete-product/:id", deleteProduct)


export default router