import express from "express"
import { getDb } from "../data/database.js"
import { isValidId, isValidUser, findMaxId } from "../data/validate.js"

const router = express.Router()
const db = getDb()

//GET /users

router.get("/", async (req, res) => {
	console.log("Get users", db.data.user)
	await db.read()
	res.send(db.data.user)
})

//GET /users/:id

router.get("/:id", async (req, res) => {
	if (!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	await db.read()
	let maybeUser = db.data.user.find((user) => user.id === id)
	if (!maybeUser) {
		res.sendStatus(404)
		return
	}

	res.send(maybeUser)
})

//POST /users

router.post("/", async (req, res) => {
	let maybeUser = req.body
	console.log("Felsöker POST: maybe=", maybeUser)

	if (isValidUser(maybeUser)) {
		console.log("Felsöker POST: is valid")
		await db.read()
		maybeUser.id = findMaxId(db.data.user) + 1
		db.data.user.push(maybeUser)
		await db.write()
		res.send({ id: maybeUser.id })
	} else {
		console.log("Felsöker POST: invalid")
		res.sendStatus(400)
	}
})

// DELETE /users

router.delete("/:id", async (req, res) => {
	if (!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	await db.read()
	let maybeUser = db.data.user.find((user) => user.id === id)
	if (!maybeUser) {
		res.sendStatus(404)
		return
	}

	db.data.user = db.data.user.filter((user) => user.id !== id)
	await db.write()
	res.sendStatus(200)
})

//PUT /users
router.put("/:id", async (req, res) => {
	if (!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	if (!isValidUser(req.body)) {
		res.sendStatus(400)
		return
	}
	// || !hasId(req.body)
	let newUser = req.body

	await db.read()
	let oldUserIndex = db.data.user.findIndex((user) => user.id === id)
	if (oldUserIndex === -1) {
		res.sendStatus(404)
		return
	}
	newUser.id = id
	db.data.user[oldUserIndex] = newUser
	await db.write()
	res.sendStatus(200)
})
export default router
