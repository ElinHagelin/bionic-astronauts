import express from "express"
import { getDb } from "../data/database.js"
import {
	findMaxId,
	isValidId,
	isValidProduct,
	hasId,
	isValidSearch
} from "../data/validate.js"

const router = express.Router()
const db = getDb()

router.get("/", async (req, res) => {
	console.log("GET/ products")
	await db.read()
	res.send(db.data.products)
})

router.get("/:id", async (req, res) => {
	if (!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	await db.read()
	let maybeProduct = db.data.product.find((product) => product.id === id)
	if (!maybeProduct) {
		res.sendStatus(404)
		return
	}

	res.send(maybeProduct)
})

router.post("/", async (req, res) => {
	let maybeProduct = req.body
	console.log("Felsöker POST: maybe=", maybeProduct)

	if (isValidProduct(maybeProduct)) {
		console.log("Felsöker POST: is valid")
		await db.read()
		maybeProduct.id = findMaxId(db.data.products) + 1
		db.data.products.push(maybeProduct)
		await db.write()
		res.status(200).send({ id: maybeProduct.id })
	} else {
		console.log("Felsöker POST: invalid")
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
	// || !hasId(req.body)
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

// Sök-funktion
router.get('/search/:string', async (req, res) => {
	let string = req.params.string

	if (isValidSearch(string) === false) {
		res.sendStatus(400)
		return
	}

	if(isValidSearch(string) === true) {
		await db.read()
		let foundProducts = await db.data.products.filter(products => products.name.toLowerCase().includes(string.toLowerCase()))
		res.status(200).send(console.log(foundProducts))
		return
	}
})

export default router
