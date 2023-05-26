import express from "express"
import productRouter from "./routes/products.js"
import userRouter from "./routes/users.js"
import searchRouter from "./routes/search.js"




const port = 1567
const app = express()

app.use("/api", express.json())

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/search", searchRouter)




app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
