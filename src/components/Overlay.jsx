
import {useRef} from "react"
import styled from "styled-components"




export default function Overlay() {
	const modal = useRef()

	const handleAddClick = () => {
		// Skicka POST request
		modal.close()
	}

	return (
		<dialog
    		ref={modal}
    		onClick={(e) => {
      		const dialogDimensions = ref.current.getBoundingClientRect();
      		if (
        		e.clientX < dialogDimensions.left ||
        		e.clientX > dialogDimensions.right ||
        		e.clientY < dialogDimensions.top ||
        		e.clientY > dialogDimensions.bottom
      		) {
        		ref.current.close();
      		}
    		}}
  		>
    		<h1>Test</h1>
			<button>Lägg till</button>
  		</dialog>	
	)
}
