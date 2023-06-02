import { getDb } from "../data/database.js"
import { isValidSearch } from "../data/validate.js"
import express from "express"
import { productSorting } from "../utils/utils.js"

const router = express.Router()
const db = getDb()

router.get("/", async (req, res) => {
	let searchInput = req.query.q
	let orderInput = req.query.order
	let sortInput = req.query.sort

	let isRegexApproved = isValidSearch(searchInput)

	await db.read()
	let foundProducts = db.data.products

	if (orderInput && sortInput && !searchInput) {
		let sortedList = productSorting(db.data.products, orderInput, sortInput)

		res.send(sortedList)
		return
	}
	else if (isRegexApproved) {
		foundProducts = db.data.products.filter(products => products.name.toLowerCase().includes(searchInput.toLowerCase()))

		if (orderInput && sortInput) {
			let sortedList = productSorting(foundProducts, orderInput, sortInput)
			res.send(sortedList)
			return sortedList
		}
		else {
			res.send(foundProducts)
			return foundProducts
		}

	}
	else {
		res.sendStatus(400)
		return
	}
})

export default router