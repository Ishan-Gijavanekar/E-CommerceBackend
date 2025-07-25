import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {dbConnect} from './src/utils/database.js'



const app = express()
const port = process.env.PORT 


// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// Routes import 
import categoryRoutes from './src/routes/category.routes.js'
import productRoutes from './src/routes/product.routes.js'
import userRoutes from './src/routes/user.routes.js'
import orderRoutes from './src/routes/order.routes.js'

app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/users", userRoutes)
app.use("api/v1/orders", orderRoutes)

app.listen(port, () => {
    dbConnect();
    console.log("Server is running on port ", port)
})