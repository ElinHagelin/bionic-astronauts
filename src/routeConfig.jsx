import { createBrowserRouter } from "react-router-dom"
import Root from "../src/components/Root.jsx"
import ViewProducts from "../src/components/ViewProducts.jsx"
import ViewUsers from "../src/components/ViewUsers.jsx"
import { useState } from "react"


export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "",
				element: <ViewProducts />,
			},
			{
				path: "users",
				element: <ViewUsers />,
			},
		],
	},
])
