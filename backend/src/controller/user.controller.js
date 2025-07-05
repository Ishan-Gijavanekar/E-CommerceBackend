import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async(req, res) => {
    try {
        const {
            name,
            email,
            password,
            street,
            apartment,
            city,
            pinCode,
            country,
            phone,
            isAdmin
        } = req.body

        if (!name || !email || !password || !street || !apartment || !city || !pinCode || !country || !phone || !isAdmin) {
            return res.status(401)
            .json({message: "All feilds are required"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userExist = await User.findOne({email})
        if (userExist) {
            return res.status(401)
            .json({message: "User with this email already exists"})
        }

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            street,
            apartment,
            country,
            pinCode,
            city,
            phone,
            isAdmin,
        })

        if (!newUser) {
            return res.status(401)
            .json({message: "User not created"})
        }

        await newUser.save()
        return res.status(200)
        .json({
            newUser,
            message: "User registered successfully"
        })

    } catch (error) {
        console.log("Error in user register controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select("-password")

        if (!users) {
             return res.status(401)
            .json({message: "Users not found"})
        }

        return res.status(200)
        .json({
            users,
            message: "Users fetched successfully"
        })
    } catch (error) {
        console.log("Error in getting all user controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getUserById = async(req, res) => {
    try {
        const id = req.params.id
        const users = await User.findById(id).select("-password")

        if (!users) {
             return res.status(401)
            .json({message: "Users not found"})
        }

        return res.status(200)
        .json({
            users,
            message: "User fetched successfully"
        })
    } catch (error) {
        console.log("Error in getting all user controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(401)
            .json({message: "All feilds are required"})
        }

        const userExists = await User.findOne({email})
        if (!userExists) {
            return res.status(401)
            .json({message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, userExists.password)
        if (!isMatch) {
            return res.status(401)
            .json({message: "Invalid credentials"})
        }

        const token = jwt.sign({id: userExists._id, isAdmin: userExists.isAdmin}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200)
        .json({
            userExists,
            message: "User logged in successfully"
        })
    } catch (error) {
        console.log("Error in user login controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const logout = async(req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200)
        .json({
            message: "User logged out successfully"
        })
    } catch (error) {
        console.log("Error in user logout controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params
        await User.findByIdAndDelete(id)
        res.status(200)
        .json({
            message: "User deleted successfully"
        })
    } catch (error) {
        console.log("Error in user delete controller: ", error) 
        return res.status(500).json({message: "Internal server error"})
    }
}

export {
    register,
    getAllUsers,
    getUserById,
    login,
    logout,
    deleteUser
}