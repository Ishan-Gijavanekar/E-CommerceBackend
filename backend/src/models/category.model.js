import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    colour: {
        type: String,
    },
    icon: {
        type: String,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
})

const Category = mongoose.model("Category", categorySchema)
export {Category}