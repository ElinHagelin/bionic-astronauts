import { Outlet, NavLink } from "react-router-dom"

const Root = () => (
	<>
		<header>
			<h1> Rubrik Webshop klockor </h1>
			<nav>
				<NavLink to="/"> Produkter </NavLink>
				<NavLink to="/users"> Användare </NavLink>
			</nav>
		</header>
		<main>
			<Outlet />
		</main>
	</>
)

export default Root
