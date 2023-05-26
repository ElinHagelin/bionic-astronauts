# Project: REST API - webshop
  
       

This is a school project in which the aim is to build a fictional webshop that uses *REST API*-functions.  
It is written in *Node.js*, using *Express* as web framework and *lowdb* as database.

The goal is to deliver an *REST API* that other students that recently have aquired knowledge about fetch can use.

## API documentation
Our data consists of a **product database** as well as a **user database**.



### For products:


#### Fetch all products:
```g
[GET] /products
```  

#### Fetch a specific product:
```
[GET] /products/:id
```

#### Add a product:
```js
// POST

async function AddProduct() {

    const exampleProduct = {
        name: 'product name',
        price: 499,
        image: "URL",
        tags: [],
        description: 'A fancy product!'
    }

    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options)
    const statusObject = await response.json()

    if (statusObject.status === 'success') {
        return true
    } else {
        return false
    }

}
```

#### Delete a product:
```
```

#### Edit a product:
```
```

#### Search for a product/products:
```
```

#### Search for a product/products with sorting function:
```
```

---
### For users:


#### Get all users:  
```
[GET] /users
```

#### Get specific user:
```
[GET] /users/:id
```

#### Add user:
```
```

#### Delete user:
```
```

---


### by Bionic Austronauts group
#### David Forslund, Elin Hagelin, Victor Lindell
##### @ Folkuniversitetet Karlstad