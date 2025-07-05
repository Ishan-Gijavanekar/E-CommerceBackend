import express from 'express'
import { getAllUsers, getUserById, register, login, logout } from '../controller/user.controller'
import { auth } from '../middlewares/auth.middleware'

const router = express.Router()


router.post("/register", register)
router.get("/get-users", auth ,getAllUsers)
router.get("/get-user/:id", auth ,getUserById)
router.post("/login", login)
router.post("/logout", auth ,logout)


export default router