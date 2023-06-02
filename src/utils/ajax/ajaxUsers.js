const getUsers = async () => {
	const response = await fetch('/api/users')
	const data = await response.json()
	return data
}

async function addUser(name, password) {
	const basUrl = "http://localhost:1567/api/users/"

	const newUser = {
		name: name,
		password: password,
	}

	const options = {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newUser),
	}

	const response = await fetch(basUrl, options)
	const statusObject = await response.json()
	if (statusObject.status === 'success') {
		return true
	} else {
		return false
	}
}

const deleteUser = async (userId) => {
	const deleteUrl = `http://localhost:1567/api/users/${userId}`
	const options = {
		method: "DELETE",
	}
	const response = await fetch(deleteUrl, options)
	if (response.status === 200)
		return true
}

async function editUser(userId, name, password) {
	const url = `http://localhost:1567/api/users/${userId}`

	const body = {
		name: name,
		password: password,
	}

	const options = {
		method: 'PUT',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}

	let response = await fetch(url, options)
}

export { getUsers, addUser, deleteUser, editUser }