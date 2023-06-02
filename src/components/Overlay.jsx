import { useContext, useEffect } from "react";
import styled from "styled-components";
import { RefContext } from "./Root";
import { useRef } from "react";
import { editProduct } from "../utils/ajax/ajaxProducts";
import validateInputs from "../utils/validateForm";
import { useRecoilState } from "recoil";
import idAtom from "../recoil/idAtom";



const StyledModal = styled.dialog`
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
    const { handleSave } = useContext(RefContext);

    const nameInput = useRef(null);
    const priceInput = useRef(null);
    const urlInput = useRef(null);
    const tagsInput = useRef(null);
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    const [id, setId] = useRecoilState(idAtom)

    useEffect(() => {
        console.log(modal);
        console.log("currentView: ", currentView);
    }, []);


	let body = {}


    function testValidity() {
        let validInputs = validateInputs(currentView, body, nameInput, priceInput, urlInput, tagsInput, usernameInput, passwordInput)

        console.log('validInputs är: ', validInputs)
        console.log('body är: ', body)

        if (validInputs) {
            handleSave(body)
        }
    }


    // function handleEditChange() {
    //     console.log(nameInput.current.value);
    // }

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
        <StyledModal
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

            {currentView === "products" && (
				<>

            	<h1> {id ? 'Ändra produkt' : 'Lägg till produkt'}</h1>
                <form>
                    <div>
                        <p>Namn:</p>
                        <input
                            type="text"
                            ref={nameInput}
                            // onChange={handleEditChange}
                        />
                    </div>

                    <div>
                        <p>Pris:</p>
                        <input
                            type="text"
                            ref={priceInput}
                            // onChange={handleEditChange}
                        />
                    </div>

                    <div>
                        <p>Bild:</p>
                        <input
                            type="text"
                            ref={urlInput}
                            // onChange={handleEditChange}
                        />
                    </div>

                    <div>
                        <p> Taggar: </p>
                        <input
                            type="text"
                            ref={tagsInput}
                            // onChange={handleEditChange}
                        />
                    </div>
                </form>
				</>
            )}
            {currentView === "users" && (
				<>
				<h1>{id ? 'Ändra användare' : 'Lägg till användare'}</h1>
                <form>
                    <div>
                        <p>Användarnamn:</p>
                        <input
                            type="text"
                            ref={usernameInput}
                            // onChange={handleEditChange}
                        />
                    </div>

                    <div>
                        <p>Lösenord:</p>
                        <input
                            type="text"
                            ref={passwordInput}
                            // onChange={handleEditChange}
                        />
                    </div>

                </form>
			</>
            )}

			<button onClick={(e) => testValidity(e)}> Spara </button>
        </StyledModal>
    );
}

export default Overlay;
