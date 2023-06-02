import { Outlet, NavLink } from "react-router-dom";
import { useRef, useEffect, createContext, useState } from "react";
import Overlay from "./Overlay.jsx";
import styled from "styled-components";
import { addProduct, editProduct } from "../utils/ajax/ajaxProducts.js";
import { addUser, editUser } from "../utils/ajax/ajaxUsers.js";
import { useRecoilState } from "recoil";
import idAtom from "../recoil/idAtom.js";

const Main = styled.main`
    position: relative;
`;

export const RefContext = createContext();
const Root = () => {
    // sätter upp vår context
    const modal = useRef(null);

    const [currentView, setCurrentView] = useState("products");
    const [variable, setVariable] = useState("");
    const [id, setId] = useRecoilState(idAtom);

    const [updateCount, setUpdateCount] = useState(0)

    const updateViewProductsComponent = () => {
        setUpdateCount((prevCount) => prevCount + 1)
    }

    const handleOpen = (variabel, object) => {
        console.log('object.id: ', object?.id)
        console.log('recoil id: ', id)

        setId(object?.id)

        modal.current.showModal();
		setVariable(variabel)
    };

	const handleSave = (body) => {

		console.log(variable)
		console.log('id:t i handleSave är: ', id)

		if (variable === 'add-products') {
            console.log('Lägg till produkt');
			addProduct(body.name, body.price, body.image, body.tags)
		} else if (variable === 'products') {
            console.log('Ändra produkt');
			editProduct(id, body.name, body.price, body.image, body.tags)
		} else if (variable === 'add-user') {
            console.log('Lägg till användare');
            addUser(body.name, body.password)
		} else {
			console.log('Ändra användare');
            editUser(id, body.name, body.password)
		}
        updateViewProductsComponent()
        modal.current.close();
	}

    const handleAddClick = () => {
        // Skicka POST request
        modal.current.close();
    };

    let modalObject = {
        modal,
        handleOpen,
		handleSave,
        handleAddClick,
        currentView,
        setCurrentView,
        updateCount,
        setUpdateCount
    };


    return (
        <>
            <RefContext.Provider value={modalObject}>
                <header>
                    <h1> Bionic-Astronauts Klockor </h1>
                    <nav>
                        <NavLink
                            className="nav-links"
                            to="/"
                            onClick={() => setCurrentView("products")}
                        >
                            {" "}
                            Produkter{" "}
                        </NavLink>
                        <NavLink
                            className="nav-links"
                            to="/users"
                            onClick={() => setCurrentView("users")}
                        >
                            {" "}
                            Användare{" "}
                        </NavLink>
                    </nav>
                </header>
                <Main>

                    <Outlet />
                </Main>
            </RefContext.Provider>
        </>
    );
};

export default Root;
