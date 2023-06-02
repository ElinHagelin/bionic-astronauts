import { Outlet, NavLink } from "react-router-dom";
import { useRef, useEffect, createContext, useState } from "react";
import Overlay from "./Overlay.jsx";
import styled from "styled-components";
import { addProduct, editProduct } from "../utils/ajax/ajaxProducts.js";
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


    const handleOpen = (variabel, objectId) => {
        console.log('objectId: ', objectId)
        console.log('recoil id: ', id)
        // if (objectId !== null || objectId !== undefined) {
            setId(objectId)
        // }
        // else {
        //     setId(objectId)
        // }
        // console.log('recoil id efteråt: ', id)
		// console.log("currentView är: ", currentView);
		// console.log(variabel)
        // console.log('objectId:t i handleOpen är: ', objectId)
        // console.log('id:t i handleOpen är: ', id)
        modal.current.showModal();
		setVariable(variabel)
		// id !== undefined && setId(id)
    };

	const handleSave = (e) => {

		console.log(variable)
		console.log('id:t i handleSave är: ', id)

		if (variable === 'add-products') {
            console.log('Lägg till produkt');
			// addProduct()
		} else if (variable === 'products') {
            console.log('Ändra produkt');
			// editProduct(id)
		} else if (variable === 'add-user') {
            console.log('Lägg till användare');
            // addUser()
		} else {
			console.log('Ändra användare');
            // editUser(id)
		}

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

                    <Outlet />
                </Main>
            </RefContext.Provider>
        </>
    );
};

export default Root;
