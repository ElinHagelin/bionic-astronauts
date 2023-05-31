import { createBrowserRouter } from "react-router-dom"
import Root from "./routes/Root.jsx"
import ViewProducts from "./routes/ViewProducts.jsx"
import ViewUsers from "./routes/ViewUsers.jsx"

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
