function isValidUser(u) {
	if (typeof u !== "object") {
		return false
	} else if (u === null) {
		return false
	}

	let nameIsValid = typeof u.name === "string"
	nameIsValid = nameIsValid && u.name !== ""

	let passwordIsValid = typeof u.password === "string"
	passwordIsValid = passwordIsValid && u.password !== ""

	if (!nameIsValid || !passwordIsValid) {
		return false
	}

	return true
}

function isValidProduct(p) {

	if (typeof p !== "object") {
		return false
	} else if (p === null) {
		return false
	}

	let nameIsValid = typeof p.name === "string"
	nameIsValid = nameIsValid && p.name !== ""
	let priceIsValid = typeof p.price === "number"
	priceIsValid = priceIsValid && p.price > 0
	let imageIsValid = typeof p.image === "string"
	imageIsValid = imageIsValid && p.image !== ""
	let tagsAreValid = Array.isArray(p.tags)

	if (
		!nameIsValid ||
		!priceIsValid ||
		!imageIsValid ||
		!tagsAreValid
	) {
		return false
	}

	return true
}

function isValidId(x) {
	let maybeId = Number(x)
	if (isNaN(maybeId)) {
		return false
	}
	return maybeId >= 0
}

function hasId(object) {
	let idIsValid = typeof object.id === "number"
	idIsValid = idIsValid && object.id >= 0
	return idIsValid
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

function isValidSearch(string) {
	const regex = /^[a-zA-Z0-9\s'"':;.,åäöÅÄÖ]+$/

	if (!regex.test(string)) {

		console.log("Not a valid search! Please refer from using special symbols.")
		return false
	} else {
		return true
	}
}

export { isValidId, findMaxId, isValidProduct, hasId, isValidSearch, isValidUser }
