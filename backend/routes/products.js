import express from "express"
import { getDb } from "../data/database.js"
import {
	findMaxId,
	isValidId,
	isValidProduct,
} from "../data/validate.js"

const router = express.Router()
const db = getDb()



router.get("/:id", async (req, res) => {
	if (!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	await db.read()
	let maybeProduct = db.data.products.find((product) => product.id === id)
	if (!maybeProduct) {
		res.sendStatus(404)
		return
	}

	res.send(maybeProduct)
})

router.post("/", async (req, res) => {
	let maybeProduct = req.body

	if (isValidProduct(maybeProduct)) {
		await db.read()
		maybeProduct.id = findMaxId(db.data.products) + 1
		db.data.products.push(maybeProduct)
		await db.write()
		res.send({ id: maybeProduct.id })

	} else {
		res.sendStatus(400)
	}
})

router.delete("/:id", async (req, res) => {
	if (!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	await db.read()
	let maybeProduct = db.data.products.find((product) => product.id === id)
	if (!maybeProduct) {
		res.sendStatus(404)
		return
	}

	db.data.products = db.data.products.filter((product) => product.id !== id)
	await db.write()
	res.sendStatus(200)
})

router.put("/:id", async (req, res) => {
	if (!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	if (!isValidProduct(req.body)) {
		res.sendStatus(400)
		return
	}
	let newProduct = req.body

	await db.read()
	let oldProductIndex = db.data.products.findIndex(
		(product) => product.id === id
	)
	if (oldProductIndex === -1) {
		res.sendStatus(404)
		return
	}
	newProduct.id = id
	db.data.products[oldProductIndex] = newProduct
	await db.write()
	res.sendStatus(200)
})


router.get("/", async (req, res) => {
	await db.read()
	res.send(db.data.products)
})

export default router
