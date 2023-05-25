import express from "express"
import { getDb } from "../data/database.js"
import { isValidId } from "../data/validate.js"

const router = express.Router()
const db = getDb()

router.get("/", async (req, res) => {
	console.log("Get users", db.data.user)
	await db.read()
	res.send(db.data.user)
})

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

export default router
