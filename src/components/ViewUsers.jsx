import { useState, useEffect, useContext } from "react";
import MediaCard from "./MediaCard.jsx";
import "../../src/App.css";
import styled from "styled-components";
import { getUsers } from "../utils/ajax/ajaxUsers.js";
import Overlay from "./Overlay.jsx";
import { RefContext } from "./Root.jsx";
import "../index.css";

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
function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { updateCount } = useContext(RefContext)

    async function getAllUsers() {
        setErrorMessage("");
        try {
            let data = await getUsers();
            setUsers(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [updateCount]);

    function handleDeleteUser(id) {
        setUsers((prevUsers) => prevUsers.filter((users) => users.id !== id));
    }


    return (
        <>
            {users ? (
                <Grid>
                    <MediaCard
                        variabel="add-user"
                    />
                    {users.map((user) => (
                        <MediaCard
                            key={user.id}
                            variabel="users"
                            object={user}
                            onDeleteUser={handleDeleteUser}
                        />
                    ))}
                </Grid>
            ) : (
                <p> Det finns inga användare än. </p>
            )}

            {errorMessage !== "" ? (
                <p> Ett fel har inträffat! {errorMessage} </p>
            ) : null}
            <Overlay />
        </>
    );
}

export default ViewUsers;
