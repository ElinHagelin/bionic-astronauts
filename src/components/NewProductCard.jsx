import * as React from "react"

import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import styled from "styled-components"




export default function MediaCard({ name, price, image }) {
	return (


		<Card sx={{ maxWidth: 300, border: 1, display: 'flex', flexDirection: 'column', justifyContent: "space-between" }} >
			<CardMedia
				sx={{ height: 140 }}
				image={image}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Lägg till ny produkt
				</Typography>
				<Typography variant="body2" color="text.secondary">

				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'center', gap: 3 }} >
				<Button size="small">Ändra</Button>
				<Button size="small">Ta bort</Button>
			</CardActions>
		</Card>
	)
}
