import { useState } from 'react'
import MediaCard from './MediaCard.jsx'
import './App.css'

function App() {
	const [products, setProducts] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	const getProducts = async () => {
		// Ta bort eventuellt felmeddelande
		setErrorMessage('')

		// Hur skriver man URL?
		// "/api/Products"
		try {
			const response = await fetch('/api/products')
			const data = await response.json()
			setProducts(data)
		} catch (error) {
			setErrorMessage(error.message)
		}
	}


	return (
		// <>
		//
		// </>
		<div>
			<button onClick={getProducts}> Give me some products! </button>
			{products
				? (
					<ul>
						{products.map(product => (
							<MediaCard key={product.id} name={product.name} price={product.price} image={product.image} />
						))}
					</ul>
				)
				: <p> No products yet... </p>}

			{errorMessage !== '' ? <p> Ett fel har inträffat! {errorMessage} </p> : null}
		</div>
	)
}

export default App
