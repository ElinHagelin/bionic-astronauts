export function sortByAscendingPrice() {
    const sortedArray = [...db.data.products].sort((a, b) => a.price - b.price )
    return sortedArray
}

export function sortByDescendingPrice(array) {
    const sortedArray = [...db.data.products].sort((a, b) => b.price - a.price )
    return sortedArray
}

export function sortByAscendingName(array) {
    const sortedArray = [...db.data.products].sort((a, b) => a.name > b.name)
    return sortedArray
}

export function sortByDescendingName(array) {
    const sortedArray = [...db.data.products].sort((a, b) => a.name < b.name)
    return sortedArray
}




export const productSorting = (array, order, sort) => {

    // console.log('array i productSorting är: ', array)

	if (sort == 'name' && order == 'asc') {
		return sortByProperty(array, 'name');

	}
    else if(sort == 'name' && order == 'desc') {
        return sortByProperty(array, 'name', true)
    }
    else if (sort == 'price' && order == 'desc') {
        return sortByProperty(array, 'price', true)
    }
    else if (sort == 'price' && order == 'asc') {
        return sortByProperty(array, 'price')
    }

}




function sortByProperty(array, property, descending = false) {
    // console.log('array ', array)
    const sortedArray = [...array].sort((a, b) => {
      if (a[property] < b[property]) {
        return descending ? 1 : -1;
      }
      if (a[property] > b[property]) {
        return descending ? -1 : 1;
      }
      return 0;
    });
    return sortedArray;
  }

