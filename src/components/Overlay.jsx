import { useContext } from "react";
import styled from "styled-components";
import { RefContext } from "./Root";
import { useRef } from "react";
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

function Overlay() {
    const { modal } = useContext(RefContext);
    const { currentView } = useContext(RefContext);
    const { handleSave } = useContext(RefContext);

    const nameInput = useRef(null);
    const priceInput = useRef(null);
    const urlInput = useRef(null);
    const tagsInput = useRef(null);
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    const [id, setId] = useRecoilState(idAtom)

    let body = {}


    function testValidity() {
        let validInputs = validateInputs(currentView, body, nameInput, priceInput, urlInput, tagsInput, usernameInput, passwordInput)


        if (validInputs) {
            handleSave(body)
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
                            />
                        </div>

                        <div>
                            <p>Pris:</p>
                            <input
                                type="text"
                                ref={priceInput}
                            />
                        </div>

                        <div>
                            <p>Bild:</p>
                            <input
                                type="text"
                                ref={urlInput}
                            />
                        </div>

                        <div>
                            <p> Taggar: </p>
                            <input
                                type="text"
                                ref={tagsInput}
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
                                ref={usernameInput} />
                        </div>

                        <div>
                            <p>Lösenord:</p>
                            <input
                                type="text"
                                ref={passwordInput} />
                        </div>

                    </form>
                </>
            )}

            <button onClick={(e) => testValidity(e)}> Spara </button>
        </StyledModal>
    );
}

export default Overlay;
