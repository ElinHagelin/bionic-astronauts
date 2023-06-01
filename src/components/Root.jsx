import { Outlet, NavLink } from "react-router-dom";
import { useRef, useEffect, createContext, useState } from "react";
import Overlay from "./Overlay.jsx";
import styled from "styled-components";

const Main = styled.main`
    position: relative;
`;

export const RefContext = createContext();
const Root = () => {
    // sätter upp vår context
    const modal = useRef(null);

    const [currentView, setCurrentView] = useState("products");

    const handleOpen = (variabel) => {
        console.log("currentView är: ", currentView);
		console.log(variabel)
        modal.current.showModal();

		// om variabel = includes(add)
			// POST

		// annars om 
    };

    const handleAddClick = () => {
        // Skicka POST request
        modal.current.close();
    };

    let modalObject = {
        modal,
        handleOpen,
        handleAddClick,
        currentView,
        setCurrentView,
    };

    return (
        <>
            <RefContext.Provider value={modalObject}>
                <header>
                    <h1> Rubrik Webshop klockor </h1>
                    <nav>
                        <NavLink
                            to="/"
                            onClick={() => setCurrentView("products")}
                        >
                            {" "}
                            Produkter{" "}
                        </NavLink>
                        <NavLink
                            to="/users"
                            onClick={() => setCurrentView("users")}
                        >
                            {" "}
                            Användare{" "}
                        </NavLink>
                    </nav>
                </header>
                <Main>
                    {/* <Overlay /> */}
                    {/* <button onClick={handleOpen}> KLICKA MIG </button> */}
                    <Outlet />
                </Main>
            </RefContext.Provider>
        </>
    );
};

export default Root;
