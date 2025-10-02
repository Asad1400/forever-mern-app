import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/dbConfig.js"
import cloudinaryConnect from "./config/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoutes.js"

// App Config
const app = express()
const PORT = process.env.PORT || 4000
connectDB()
cloudinaryConnect()

// middlewares
app.use(express.json())
app.use(cors())

// api end-points
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
}) 

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
})