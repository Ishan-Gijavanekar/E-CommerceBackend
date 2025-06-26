import {Product} from '../models/product.model.js'
import {Category} from '../models/category.model.js'

const addProduct = async(req, res) => {
    try {
        const {
            name,
            description,
            richDescription,
            image,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured
        } = req.body

        const categoryExists = await Category.findById(category)

        if (!categoryExists) {
            return res.status(401)
            .json({message: "Category not found"})
        }

        const product = new Product({
            name,
            description,
            richDescription,
            image,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured
        })

        if (!product) {
            return res.status(401)
            .json({message: "Error in creating the product"})
        }

        await product.save();
        return res.status(200)
        .json({
            product,
            message: "Product added successfully"})

    } catch (error) {
        console.log(`Error in add product controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}


const getProducts = async(req, res) => {
    try {
        const productList = await Product.find()

        if (!productList) {
            return res.status(401)
            .json({message: "Error in getting the products"})
        }

        return res.status(200)
        .json({
            productList,
            message: "Products fetched successfully"
        })
    } catch (error) {
        console.log(`Error in getting all products controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getProductById = async(req, res) => {
    try {
        const id = req.params
        const product = await Product.findById(id)

        if (!product) {
            return res.status(401)
            .json({message: "Error in getting the product"})
        }

        return res.status(200)
        .json({
            product,
            message: "Product fetched successfully"
        })
    } catch (error) {
        console.log(`Error in a getting specific product controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const updateProduct = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(`Error in update product controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const deleteProduct = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(`Error in delete product controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export {addProduct, getProducts, getProductById, updateProduct, deleteProduct}