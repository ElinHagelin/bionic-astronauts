import { Outlet, NavLink } from "react-router-dom";
import { useRef, createContext, useState } from "react";
import styled from "styled-components";
import { addProduct, editProduct } from "../utils/ajax/ajaxProducts.js";
import { addUser, editUser } from "../utils/ajax/ajaxUsers.js";
import { useRecoilState } from "recoil";
import idAtom from "../recoil/idAtom.js";
import "../index.css";

const Main = styled.main`
    position: relative;
`;

export const RefContext = createContext();

const Root = () => {
    const modal = useRef(null);

    const [currentView, setCurrentView] = useState("products");
    const [variable, setVariable] = useState("");
    const [id, setId] = useRecoilState(idAtom);

    const [updateCount, setUpdateCount] = useState(0)

    const updateViewProductsComponent = () => {
        setUpdateCount((prevCount) => prevCount + 1)
    }

    const handleOpen = (variabel, object) => {
        setId(object?.id)
        modal.current.showModal();
        setVariable(variabel)
    };

    const handleSave = (body) => {

        if (variable === 'add-products') {
            addProduct(body.name, body.price, body.image, body.tags)

        } else if (variable === 'products') {
            editProduct(id, body.name, body.price, body.image, body.tags)

        } else if (variable === 'add-user') {
            addUser(body.name, body.password)

        } else {
            editUser(id, body.name, body.password)

        }
        updateViewProductsComponent()
        modal.current.close();
    }

    const handleAddClick = () => {
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
