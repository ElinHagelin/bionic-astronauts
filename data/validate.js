function isValidUser(u) {
	console.log("isValidUser 1")
	if (typeof u !== "object") {
		return false
	} else if (u === null) {
		return false
	}

	console.log("isValidUser 2")

	let nameIsValid = typeof u.name === "string"
	nameIsValid = nameIsValid && u.name !== ""

	let passwordIsValid = typeof u.password === "string"
	passwordIsValid = passwordIsValid && u.password !== ""

	if (!nameIsValid || !passwordIsValid) {
		return false
	}
	console.log("isValidUser 3")
	return true
}

function isValidId(x) {
	let maybeId = Number(x)
	if (isNaN(maybeId)) {
		return false
	}
	return maybeId >= 0
}

function findMaxId(list) {
	let maxId = 0
	for (const item of list) {
		if (item.id && item.id > maxId) {
			maxId = item.id
		}
	}
	return maxId
}

export { isValidId, findMaxId, isValidUser }
