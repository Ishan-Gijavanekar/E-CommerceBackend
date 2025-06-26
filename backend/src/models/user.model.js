import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    apartment: {
        type: String,
        required: true,
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
        type: Number,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema)
export {User}