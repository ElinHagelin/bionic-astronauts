import * as React from "react"

import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import styled from "styled-components"

import { addProduct } from "../utils/ajax/ajaxProducts.js"




// export default function MediaCard({ name, price, image }) {
// 	return (


// 		<Card sx={{ maxWidth: 300, border: 1, display: 'flex', flexDirection: 'column', justifyContent: "space-between" }} >
// 			<CardMedia
// 				sx={{ height: 140 }}
// 				image={image}
// 			/>
// 			<CardContent>
// 				<Typography gutterBottom variant="h5" component="div">
// 					{name}
// 				</Typography>
// 				<Typography variant="body2" color="text.secondary">
// 					{price}:-
// 				</Typography>
// 			</CardContent>
// 			<CardActions sx={{ justifyContent: 'center', gap: 3 }} >
// 				<Button size="small">Ändra</Button>
// 				<Button size="small">Ta bort</Button>
// 			</CardActions>
// 		</Card>
// 	)
// }
export default function MediaCard({ variabel, object }) {

	function checkObject(string) {
		if (variabel === string) {
			return true
		} else {
			return false
		}
	}
	let isProduct = checkObject('products')
	let isUser = checkObject('users')
	let isAddUser = checkObject('add-user')
	let isAddProducts = checkObject('add-products')
	let isEditProduct = checkObject('edit-product')
	let isEditUsers = checkObject('edit-users')

	function handleAdd() {
		if (isAddUser) {
			addProduct()
		}
	}

	function handleDelete(id) {

	}

	function handleClick() {
		// Öppna overlay

		// Räkna ut vilken funktion som ska köras
	}

	return (


		<Card sx={{ maxWidth: 300, border: 1, display: 'flex', flexDirection: 'column', justifyContent: "space-between" }} >

			{isProduct && (<CardMedia sx={{ height: 140 }} image={object.image} />)}

			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{isProduct ? object.name
						: isUser ? object.username
							: isAddUser ? 'Lägg till ny användare'
								: isAddProducts ? 'Lägg till ny produkt'
									: null}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{isProduct ? `${object.price}:-` : isUser ? object.password
						: null}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'center', gap: 3 }} >
				{isProduct || isUser ? <>
					<Button size="small" onClick={() => handleEdit(object.id)}>Ändra</Button>
					<Button size="small" onClick={() => handleDelete(object.id)}>Ta bort</Button>
				</>
					: isAddUser || isAddProducts ? <Button size="small" onClick={handleAdd}>Lägg Till</Button>

						: null}

			</CardActions>
		</Card >
	)
}
