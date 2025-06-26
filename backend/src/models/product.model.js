import mongoose from "mongoose";

const productSchema = new  mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    images: [
        {type: String}
    ],
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0.0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
    },
    numReviews: {
        type: Number,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);
export {Product}