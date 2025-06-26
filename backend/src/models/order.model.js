import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orderitem",
        }
    ],
    shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0.0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderedDate: {
        type: Date,
        default: Date.now()
    },
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)
export {Order}