import { getDb } from "../data/database.js"
import { isValidSearch } from "../data/validate.js"
import express from "express"
import { productSorting } from "../utils/utils.js"

const router = express.Router()
const db = getDb()

router.get("/", async (req, res) => {
	let searchInput = req.query.string
	let orderInput = req.query.order
	let sortInput = req.query.sort

	console.log(req.query);

	if (isValidSearch(searchInput) === false) {
		res.sendStatus(400)
		return
	}

	if(isValidSearch(searchInput) === true) {
		await db.read()

        let foundProducts = await db.data.products.filter(products => products.name.toLowerCase().includes(searchInput.toLowerCase()))

        if (orderInput && sortInput) {
            productSorting(foundProducts, orderInput, sortInput)
        }

		res.status(200).send(foundProducts)
		return
	}

})

export default router