import { useState, useEffect } from "react";
import MediaCard from "./MediaCard.jsx";
import "../../src/App.css";
import styled from "styled-components";
import { getUsers } from "../utils/ajax/ajaxUsers.js";
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
function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

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
    }, []);

    function handleDeleteUser(id) {
        setUsers((prevUsers) => prevUsers.filter((users) => users.id !== id));
    }

    async function handleEditUser(id, name, password) {
        try {
            await editUser(id, name, password);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <>
            {users ? (
                <Grid>
                    <MediaCard
                        variabel="add-user"
                        onDeleteUser={handleDeleteUser}
                    />
                    {users.map((users) => (
                        <MediaCard
                            key={users.id}
                            variabel="users"
                            object={users}
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
            <Overlay page="users" />
        </>
    );
}

export default ViewUsers;
