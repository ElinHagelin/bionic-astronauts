const getProducts = async () => {

	const response = await fetch('/api/products')
	const data = await response.json()
	return data
}

async function addProduct(name, price, image, tags) {

	const baseUrl = "/api/products/"

	const newProduct = {
		name: name,
		price: price,
		image: image,
		tags: tags,
	}

	const options = {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newProduct)
	}

	const response = await fetch(baseUrl, options)
}


const deleteProduct = async (productId) => {
	const deleteUrl = `/api/products/${productId}`

	const options = {
		method: "DELETE",
	}

	try {
		const response = await fetch(deleteUrl, options)
		console.log("success")
		return true

	} catch (error) {
		console.log("Delete status failed: ", response)
		return false
	}

}

async function editProduct(productId, name, price, image, tags) {
	const url = `/api/products/${productId}`

	const body = {
		name: name,
		price: price,
		image: image,
		tags: tags,
	}

	const options = {
		method: 'PUT',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}

	let response = await fetch(url, options)
	console.log(response)
}

export { getProducts, addProduct, deleteProduct, editProduct, }