


const validateInputs = (currentView, body, nameInput, priceInput, imageInput, tagsInput, usernameInput, passwordInput) => {

    let nameIsValid
    let priceIsValid
    let imageIsValid
	let tagString
	let usernameIsValid
	let passwordIsValid
	let tagArray = []

	if (currentView === 'products') {
		nameIsValid = (nameInput.current.value !== '')
		priceIsValid = /^\d+$/.test(priceInput.current.value)
		imageIsValid = (imageInput.current.value !== '')
		tagString = tagsInput.current.value
		if (tagString.includes(",")) {
			tagArray = tagString.split(", ")
		} else {
			tagArray = tagString.split(" ")
		}

	} else if (currentView === 'users') {
		usernameIsValid = (usernameInput.current.value !== '')
		passwordIsValid = (passwordInput.current.value !== '')
	}


	if (currentView === 'products' && nameIsValid && priceIsValid && imageIsValid) {
		body.name = nameInput.current.value
		body.price = Number(priceInput.current.value)
		body.image = imageInput.current.value
		body.tags = tagArray
		return true
	}
	else if (currentView === 'users' && usernameIsValid && passwordIsValid) {
		body.name = usernameInput.current.value
		body.password = passwordInput.current.value
		return true
	}
	return false
}

export default validateInputs