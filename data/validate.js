


function isValidId(x) {
	let maybeId = Number(x)
	if (isNaN(maybeId)) {
		return false
	}
	return maybeId >= 0
}

function findMaxId(list) {
	let maxId = 0;
	for (const item of list) {
		if (item.id && item.id > maxId) {
			maxId = item.id;
		}
	}
	return maxId;
}

export { isValidId, findMaxId }