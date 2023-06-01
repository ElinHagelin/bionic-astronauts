import { useState, useEffect } from "react";
import MediaCard from "./MediaCard.jsx";
import "../../src/App.css";
import styled from "styled-components";
import { getProducts } from "../utils/ajax/ajaxProducts.js";
import Overlay from "./Overlay.jsx";

const Grid = styled.div`
    display: grid;
    grid-template-columns: auto;
    padding: 0;
    gap: 2em;

    @media screen and (min-width: 700px) {
        grid-template-columns: auto auto;
    }
    @media screen and (min-width: 1000px) {
        grid-template-columns: auto auto auto;
    }
`;

function ViewProducts() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    async function getAllProducts() {
        console.log("Inuti getALLProducts");
        setErrorMessage("");
        try {
            let data = await getProducts();
            console.log(data);
            setProducts(data);
            console.log("Hämtat data: ", data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    async function handleEditProduct(id, name, price, image, tags) {
        try {
            await editProduct(id, name, price, image, tags);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    function handleDeleteProduct(id) {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    }

    return (
        <>
            {products ? (
                <Grid>
                    <MediaCard
                        variabel="add-products"
                    />
                    {products.map((product) => (
                        <MediaCard
                            key={product.id}
                            variabel="products"
                            object={product}
                            onDeleteProduct={handleDeleteProduct}
                        />
                    ))}
                </Grid>
            ) : (
                <p> Det finns inga produkter än </p>
            )}

            {errorMessage !== "" ? (
                <p> Ett fel har inträffat! {errorMessage} </p>
            ) : null}
            <Overlay page="products" />
        </>
    );
}

export default ViewProducts;
