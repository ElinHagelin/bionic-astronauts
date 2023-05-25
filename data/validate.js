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

function isValidProduct(p) {
	console.log("isValidProduct 1")

	if (typeof p !== "object") {
		return false
	} else if (p === null) {
		return false
	}

	console.log("isValidProduct 2")

	let nameIsValid = typeof p.name === "string"
	nameIsValid = nameIsValid && p.name !== ""
	let priceIsValid = typeof p.price === "number"
	priceIsValid = priceIsValid && p.price > 0
	let imageIsValid = typeof p.image === "string"
	imageIsValid = imageIsValid && p.image !== ""
	let descriptionIsValid = typeof p.description === "string"
	descriptionIsValid = descriptionIsValid && p.description !== ""
	let tagsAreValid = Array.isArray(p.tags)

	console.log("tagsAreValid är: ", tagsAreValid)

	if (
		!nameIsValid ||
		!priceIsValid ||
		!imageIsValid ||
		!descriptionIsValid ||
		!tagsAreValid
	) {
		return false
	}

	console.log("isValidProduct 3")
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

<<<<<<< HEAD
export { isValidId, findMaxId, isValidProduct, hasId, isValidUser }
=======
function isValidSearch(string) {
	const regex = /^[a-zA-Z0-9\s'"':;.,åäöÅÄÖ]+$/

	if (!regex.test(string)) {
		console.log("Not a valid search! Please refer from using special symbols.")
		return false
	} else {
		return true
	}
}

export { isValidId, findMaxId, isValidProduct, hasId, isValidSearch }
>>>>>>> feature_search
