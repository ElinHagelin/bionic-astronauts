import { useContext, useEffect } from "react";
import styled from "styled-components";
import { RefContext } from "./Root";
import { useRef } from "react";
import { editProduct } from "../utils/ajax/ajaxProducts";

const styledModal = styled.dialog`
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

function Overlay({ page }) {
    const { modal } = useContext(RefContext);
    const { handleOpen } = useContext(RefContext);
    const { handleAddClick } = useContext(RefContext);
    const { currentView } = useContext(RefContext);
    const { setCurrentView } = useContext(RefContext);

    const nameInput = useRef(null);
    const priceInput = useRef(null);
    const urlInput = useRef(null);
    const tagsInput = useRef(null);
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    useEffect(() => {
        console.log(modal);
        console.log("currentView: ", currentView);
    }, []);

    function handleEditChange() {
        console.log(nameInput.current.value);
    }

    // function handleDelete(id) {
    // 	if (isProduct) {
    // 		deleteProduct(id)
    // 		onDeleteProduct(id)
    // 	} else if (isUser) {
    // 		deleteUser(id)
    // 		onDeleteUser(id)
    // 	}
    // }

    function handleEditClick() {
        if (page === "products") {
            editProduct(id);
        } else if (page === "users") {
            editUser(id);
        }
    }
    return (
        <dialog
            ref={modal}
            onClick={(e) => {
                const dialogDimensions = modal.current.getBoundingClientRect();
                if (
                    e.clientX < dialogDimensions.left ||
                    e.clientX > dialogDimensions.right ||
                    e.clientY < dialogDimensions.top ||
                    e.clientY > dialogDimensions.bottom
                ) {
                    modal.current.close();
                }
            }}
        >
            <h1>Test</h1>

            {currentView === "products" && (
                <form>
                    <div>
                        <p>Namn:</p>
                        <input
                            type="text"
                            ref={nameInput}
                            onChange={handleEditChange}
                        />
                    </div>

                    <div>
                        <p>Pris:</p>
                        <input
                            type="text"
                            ref={priceInput}
                            onChange={handleEditChange}
                        />
                    </div>

                    <div>
                        <p>Bild:</p>
                        <input
                            type="text"
                            ref={urlInput}
                            onChange={handleEditChange}
                        />
                    </div>

                    <div>
                        <p> Taggar: </p>
                        <input
                            type="text"
                            ref={tagsInput}
                            onChange={handleEditChange}
                        />
                    </div>
                    <button> Spara </button>
                </form>
            )}
            {currentView === "users" && (
                <form>
                    <div>
                        <p>Användarnamn:</p>
                        <input
                            type="text"
                            ref={usernameInput}
                            onChange={handleEditChange}
                        />
                    </div>

                    <div>
                        <p>Lösenord:</p>
                        <input
                            type="text"
                            ref={passwordInput}
                            onChange={handleEditChange}
                        />
                    </div>

                    <button> Spara </button>
                </form>
            )}

            {/* <button onClick={handleAddClick}>Lägg till</button> */}
        </dialog>
    );
}

export default Overlay;
