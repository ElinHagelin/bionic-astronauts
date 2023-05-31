console.log('server 1')

import * as dotenv from 'dotenv'
dotenv.config()
import express from "express"
import cors from "cors"
import productRouter from "./routes/products.js"
import userRouter from "./routes/users.js"
import searchRouter from "./routes/search.js"
import {join, dirname} from 'path'
import {fileURLToPath } from 'url'


const port = process.env.PORT || 1567
const app = express()

app.use("/api", express.json())
app.use(cors())

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.body)
	next()
})

const whereWeAre = dirname(fileURLToPath(import.meta.url))
const dist = join(whereWeAre, '../dist')
app.use(express.static(dist))

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/search", searchRouter)

app.get('*', (req, res) => {
	res.sendFile(join(dist, 'index.html'))
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})





