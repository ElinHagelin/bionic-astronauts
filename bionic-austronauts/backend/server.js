import express from "express"
import cors from "cors"
import productRouter from "./routes/products.js"
import userRouter from "./routes/users.js"
import searchRouter from "./routes/search.js"

const port = 1567
const app = express()

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.body)
	next()
})

app.use("/api", express.json())
app.use(cors())

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/search", searchRouter)

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
