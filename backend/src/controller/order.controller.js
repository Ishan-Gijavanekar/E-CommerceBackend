import {Order} from "../models/order.model.js"
import {OrderItem} from '../models/Orderitem.model.js'

const createOrder = async (req, res) => {
    try {

        const {OrderItem} = req.body

        if (!OrderItem) {
            return res.status(401)
            .json({message: "All feilds are required"})
        }

        const orderItemIds = Promise.all(OrderItem.map(async (item) => {
            const {product, quantity} = item
            const orderItem = new OrderItem({product, quantity})
            await orderItem.save()

            return orderItem._id
        }))
        const orderItemsIdsResolved = await orderItemIds
        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (item) => {
            const orderItem = await OrderItem.findById(item).populate("product", "price")
            const totalPrice = orderItem.product.price * orderItem.quantity
            return totalPrice
        }))

        const totalPrice = totalPrices.reduce((a, b) => a + b, 0)

        const {shippingAddress1, shippingAddress2, city, pinCode, country, phone, status, user} = req.body

        if (!OrderItem || !shippingAddress1 || !shippingAddress2 || !city || !pinCode || !country || !phone || !status || !user) {
            return res.status(401)
            .json({message: "All feilds are required"})
        }

        const order = new Order({
            OrderItem: orderItemsIdsResolved,
            shippingAddress1,
            shippingAddress2,
            city,
            pinCode,
            country,
            phone,
            status,
            totalPrice: totalPrice,
            user
        })

        await order.save()

        if (!order) {
            return res.status(401)
            .json({message: "The order cannot be created"})
        }

        return res.status(200)
        .json({order, message: "Order created successfully"});
    } catch (error) {
        console.log("Error in create order controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getOrders = async (req, res) => {
    try {
        const {id, isAdmin} = req.user
        if (!isAdmin) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const getOrders = await Order.find().populate("OrderItem", "product", "user", "name").sort({orderAt: -1})
        return res.status(200).json(getOrders)
    } catch (error) {
        console.log("Error in get order controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getUserOrders = async (req, res) => {
    try {
        const getOrders = await Order.find({user: req.user.id}).populate("OrderItem", "product", "user", "name").sort({orderAt: -1})
        return res.status(200).json(getOrders)
    } catch (error) {
        console.log("Error in get order controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getOrderById = async (req, res) => {
    try {
        const {id} = req.params
        const order = await Order.findById(id).populate("user", "name").populate({path: "OrderItem", populate: {path: "product"}})
        return res.status(200).json(order)
    } catch (error) {
        console.log("Error in get order controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const {id} = req.params
        const {isAdmin} = req.user
        if (!isAdmin) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const order = await Order.findByIdAndUpdate(
            id,
            {
                status: req.body.status
            
            },
            {
                new: true
            }   
        )
        if (!order) {
            return res.status(401).json({message: "Order not found"})
        }
        return res.status(200).json({order, message: "Order updated successfully"})
    } catch (error) {
        console.log("Error in update order controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const deleteOrder = async (req, res) => {
    try {
        const {id} = req.params
        const order = await Order.findById(id)
        if (!order) {
            return res.status(401).json({message: "Order not found"})
        }
        const orderItems = order.orderItems
        await OrderItem.deleteMany({_id: {$in: orderItems}})
        await Order.findByIdAndDelete(id)
        
        return res.status(200).json({order, message: "Order deleted successfully"})
    } catch (error) {
        console.log("Error in delete order controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const totalSales = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            {$group: {_id: null, totalSales: {$sum: "$totalPrice"}}}
        ])
        if (!totalSales) {
            return res.status(401).json({message: "Order sales cannot be found"})
        }
        return res.status(200).json({totalSales: totalSales.pop().totalSales})
    } catch (error) {
        console.log("Error in total sales controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const countTotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments((count) => count)
        if (!totalOrders) {
            return res.status(401).json({message: "Order sales cannot be found"})
        }
        return res.status(200).json({totalOrders: totalOrders})
    } catch (error) {
        console.log("Error in total sales controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export {createOrder, getOrders, getUserOrders, getOrderById, updateOrderStatus, deleteOrder, totalSales}