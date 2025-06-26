import {Category} from '../models/category.model.js'

const addCategory = async(req, res) => {
    try {
        const {name, icon, colour} = req.body
        const category = new Category({
            name,
            icon,
            colour,
        })
        await category.save()

        if (!category) {
            return res.status(401)
            .json({message: "The category cannot be created"});
        }   
        return res.status(200)
        .json(category);

    } catch (error) {
        console.log(`Error in add category controller: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const deleteCategory = async(req, res) => {
    try {
        const id = req.params
        const categoryExists = Category.findById(id)
        if (!categoryExists) {
            return res.status(401)
            .json({message: "Category not mentioned with this id"})
        }
        await Category.findByIdAndDelete(id)
        return res.status(200)
        .json({message: "Category deleted successfully"})
    } catch (error) {
        console.log(`Error in delete category controller ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.find()
        if (!categories) {
            return res.status(401)
            .json({message: "Something went wrongw"})
        }
        return res.status(200)
        .json({
            categories,
            message: "Categories fetched successfully"
        })
    } catch (error) {
        console.log(`Error in logging all categories, ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getCategoryById = async(req, res) => {
    try {
        const id = req.params
        const category = await Category.findById(id)
        if (!category) {
            return res.status(401)
            .json({message: "Category not found with this id"})
        }
        return res.status(200)
        .json({
            category,
            message: "Category fetched successfully"
        })
    } catch (error) {
        console.log(`Error in logging specific categories, ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const updateCategory = async(req, res) => {
    try {
        const id = req.params
        const {name, icon, colour} = req.body

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                name,
                icon,
                colour,
            },
            {
                new: true,
            }
        )

        if (!updatedCategory) {
            return res.status(401)
            .json({message: "Error in updating the category"})
        }

        res.status(200)
        .json({
            updatedCategory,
            message: "Category updated successfully"
        })
    } catch (error) {
        console.log(`Error in updating categories, ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export {addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory}