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

        if (!name || !description || !richDescription || !brand || !price || !category || !countInStock || !rating || !numReviews ||!isFeatured) {
            return res.status(401)
            .json({message: "All fields are required"})
        }

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
        const id = req.params
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

        if (!name || !description || !richDescription || !brand || !price || !category || !countInStock || !rating || !numReviews ||!isFeatured) {
            return res.status(401)
            .json({message: "All fields are required"})
        }

        const productExists = await Product.findById(id)

        if (!productExists) {
            return res.status(401)
            .json({message: "The product selected does not exsist"})
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
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
            },
            {
                new: true
            }
        )

        return res.status(200)
        .json({
            updatedProduct,
            message: "Product Updated Successfully"
        })
    } catch (error) {
        console.log(`Error in update product controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const deleteProduct = async(req, res) => {
    try {
        
        const id = req.params
        const productExists = await Product.findById(id)

        if (!productExists) {
            return res.status(401)
            .json({message: "The product selected does not exsist"})
        }

        await Product.findByIdAndDelete(id)

        return res.status(200)
        .json({message: "Product deleted successfully"})
    } catch (error) {
        console.log(`Error in delete product controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getProductsWithCategory = async(req, res) => {
    try {
        const productList = await Product.find().populate('category')

        if (!productList) {
            return res.status(401)
            .json({message: "Error in getting the products"})
        }

        return res.status(200)
        .json({
            productList,
            message: "Products fetched successfully with category details"
        })
    } catch (error) {
        console.log(`Error in getting products with category controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getProductByIdWithCategory = async(req, res) => {
    try {
        const id = req.params
        const product = await Product.findById(id).populate('category')

        if (!product) {
            return res.status(401)
            .json({message: "Error in getting the product"})
        }

        return res.status(200)
        .json({
            product,
            message: "Product fetched successfully with category details"
        })
    } catch (error) {
        console.log(`Error in getting productwith category controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getProductCount = async(req, res) => {
    try {
        const count = await Product.countDocuments((count) => count)

        if (!count) {
            return res.status(401)
            .json({message: "No Products Found"})
        }

        return res.status(200)
        .json({
            count: count,
            message: "Product count retrived successfully"
        })
    } catch (error) {
        console.log(`Error in getting product count controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getFeaturedProducts = async(req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0
        const featuredProducts = await Product.find({isFeatured: true}).limit(parseInt(count))

        if (!featuredProducts) {
            return res.status(401)
            .json({message: "No featured products"})
        }

        return res.status(200)
        .json({
            featuredProducts,
            message: "Featured products retrived successfully"
        })
    } catch (error) {
        console.log(`Error in getting featured products controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getProductsByCategory = async(req, res) => {
    try {
        let filter = {}
        if (req.query.categories) {
            filter = {category : req.query.categories.split(',')}
        }

        const products = await Product.find(filter).populate('category')

        if (!products) {
            return res.status(401)
            .json({message: "products not available"})
        }

        return res.status(200)
        .json({
            products,
            message: "Products Fetched successfully"
        })
       
    } catch (error) {
        console.log(`Error in getting product of specific category controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}


export {addProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct, 
    getProductsWithCategory, 
    getProductByIdWithCategory,
    getProductCount,
    getFeaturedProducts,
    getProductsByCategory
}