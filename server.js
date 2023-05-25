import express from "express"
import productRouter from "./routes/products.js"
import userRouter from "./routes/users.js"

const port = 1567
const app = express()

app.use("/api", express.json())

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
