import express from 'express'
import { getDb } from '../data/database.js'
import { isValidId } from '../data/validate.js'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
	console.log('GET/ products');
	await db.read()
	res.send(db.data.product)
})


router.get('/:id', async (req, res) => {

	if (!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	await db.read()
	let maybeProduct = db.data.product.find(product => product.id === id)
	if (!maybeProduct) {
		res.sendStatus(404)
		return
	}

	res.send(maybeProduct)
})

export default router