# Project: REST API - webshop



This is a school project in which the aim is to build a fictional webshop that uses *REST API*-functions.
It is written in *Node.js*, using *Express* as web framework and *lowdb* as database.

The goal is to deliver an *REST API* that other students that recently have aquired knowledge about fetch can use.

## API documentation
Our data consists of a **product database** as well as a **user database**.



### For products:


#### Fetch all products:
```js
[GET] /products
```

#### Fetch a specific product:
```js
[GET] /products/:id
```

#### Add a product:
```js
[POST] REQUIRES BODY:

{
    name: 'fancy product',      // string
    price: price,               // number
    image: URL,                 // string
    tags: ['string', 'string'], // [string]
    description: 'bla bla',     // string
}
```

#### Delete a product:
```js
[DELETE] /products/:id
```

#### Edit a product:
```js
[PUT] /products/:id
//REQUIRES BODY (same as POST)
```

#### Search for a product/products:
```js
[GET] /search?q=examplesearch
```

#### Search for a product/products with sorting function:
```js
[GET] /search?q=examplesearch&sort=name&order=asc

// sort = name or price
// order = asc or desc
```


---
### For users:


#### Get all users:
```js
[GET] /users
```

#### Get specific user:
```js
[GET] /users/:id
```

#### Add user:
```js
[POST] REQUIRES BODY:

{
    username: 'admin',      // string
    password: '12345',      // string
}
```

#### Delete user:
```js
[DELETE] /users/:id
```

#### Edit user:
```js
[PUT] /users/:id
//REQUIRES BODY (same as POST)
```


---

## Code examples

### Fetch all products
```js
async function getAllProducts() {
    const baseUrl = "http://..../api/products/"
    const options = { method: 'GET' }

    try (
        let response = await fetch(baseUrl, options)
        let data = await response.json()
        return data
    ) catch (
        console.log('error')
    )
}

```


###  Add a product
```js
// POST

async function AddProduct() {

    const baseUrl = "http://..../api/products/"

    const exampleProduct = {
        name: 'product name',           // string
        price: price,                   // number
        image: "URL",                   // string
        tags: [],                       // string array
        description: 'A fancy product!' // string
    }

    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
        body: JSON.stringify(data)
    }

    const response = await fetch(baseUrl, options)
    const statusObject = await response.json()

    if (statusObject.status === 'success') {
        return true
    } else {
        return false
    }

}
```
### Delete a product
```js
	const handleDelete = async (productId) => {
		const deleteUrl =`http://..../api/products/${productId}`

		const options = {
			method: "DELETE",
		}

		const response = await fetch(deleteUrl, options)
		const statusObject = await response.json()
		if (statusObject.status === "success") {
			console.log("success")
			return true
		}
		console.log("Delete status failed: ", statusObject)
		return false
	}

```

### Edit a product
```js
async function editProduct(productId) {
    const url =`http://..../api/products/${productId}`

    const body = {
        name: 'product name',           // string
        price: price,                   // number
        image: "URL",                   // string
        tags: [],                       // string array
        description: 'A fancy product!' // string
    }

    const options = {
    method: 'PUT',
    headers: { "Content-Type": "application/json" }
    body: JSON.stringify(body)
    }

    let response = await fetch(url, options)
    let status = await response.json()
}


```

---


### by Bionic Austronauts group
#### David Forslund, Elin Hagelin, Victor Lindell
##### @ Folkuniversitetet Karlstad