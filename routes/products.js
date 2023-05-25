import express from 'express'
import { getDb } from '../data/database.js'
import { findMaxId, isValidId, isValidProduct } from '../data/validate.js'

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


router.post('/', async (req, res) => {
	let maybeProduct = req.body
	console.log('Felsöker POST: maybe=', maybeProduct)


	if (isValidProduct(maybeProduct)) {
		console.log('Felsöker POST: is valid')
		await db.read()
		maybeProduct.id = findMaxId(db.data.product) + 1
		db.data.product.push(maybeProduct)
		await db.write()
		res.status(200).send({ id: maybeProduct.id })

	} else {
		console.log('Felsöker POST: invalid')
		res.sendStatus(400)
	}
})

export default router