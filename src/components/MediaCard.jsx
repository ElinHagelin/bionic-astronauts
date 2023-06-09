import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useContext } from "react"
import { RefContext } from "./Root.jsx"
import { deleteProduct } from "../utils/ajax/ajaxProducts.js"
import { deleteUser } from "../utils/ajax/ajaxUsers.js"



export default function MediaCard({ variabel, object, onDeleteProduct, onDeleteUser }) {
	const { handleOpen } = useContext(RefContext)

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


	function handleDelete(id) {
		if (isProduct) {
			deleteProduct(id)
			onDeleteProduct(id)
		} else if (isUser) {
			deleteUser(id)
			onDeleteUser(id)
		}
	}

	return (

		<Card sx={{ maxWidth: 300, border: 1, display: 'flex', flexDirection: 'column', justifyContent: "space-between" }} >


			{isProduct && (<CardMedia sx={{ height: 140 }} image={object.image} />)}

			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{isProduct ? object.name
						: isUser ? object.name
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
					<Button size="small" onClick={() => handleOpen(variabel, object)}>Ändra</Button>
					<Button size="small" onClick={() => handleDelete(object.id)}>Ta bort</Button>
				</>
					: isAddUser || isAddProducts ? <Button size="small" onClick={() => handleOpen(variabel)}>Lägg Till</Button>

						: null}

			</CardActions>
		</Card >
	)
}
