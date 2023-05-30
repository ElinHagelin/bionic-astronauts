import { useState, useEffect } from "react"
import MediaCard from "./components/MediaCard.jsx"
import "./App.css"
import styled from "styled-components"
import { getProducts } from "./utils/ajax/ajaxProducts.js"

const Grid = styled.div`
    display: grid;
    grid-template-columns: auto;
    padding: 0;
    gap: 2em;

    @media screen and (min-width: 700px) {
        grid-template-columns: auto auto
    }
    @media screen and (min-width: 1000px) {
        grid-template-columns: auto auto auto
    }
`

function App() {
    const [products, setProducts] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    async function getAllProducts() {
        console.log("Inuti getALLProducts")
        setErrorMessage("")
        try {
            let data = await getProducts()
            console.log(data)
            setProducts(data)
            console.log("Hämtat data: ", data)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        console.log("inuti useEffect")
        getAllProducts()
    }, [])

    return (
        <>
            {products ? (
                <Grid>
                    <MediaCard variabel="add-products" />
                    {products.map((product) => (
                        <MediaCard
                            key={product.id}
                            variabel="products"
                            object={product}
                        />
                    ))}
                </Grid>
            ) : (
                <p> No products yet... </p>
            )}

            {errorMessage !== "" ? (
                <p> Ett fel har inträffat! {errorMessage} </p>
            ) : null}
        </>
    )
}

export default App
