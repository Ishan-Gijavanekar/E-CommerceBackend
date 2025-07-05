import express from 'express'
import { auth } from '../middlewares/auth.middleware'
import { createOrder,getOrderById,getOrders, getUserOrders, updateOrderStatus, deleteOrder, totalSales } from '../controller/order.controller'

const router = express.Router()

router.post("/new-order", auth, createOrder)
router.get("/get-orders", auth, getOrders)
router.get("/get-user-orders/:id", auth, getUserOrders)
router.get("/get-order-by-id/:id", auth, getOrderById)
router.put("/update-order-status/:id", auth, updateOrderStatus)
router.delete("/delete-order/:id", auth, deleteOrder)
router.get("/total-sales", auth, totalSales)

export default router