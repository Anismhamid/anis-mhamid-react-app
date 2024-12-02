import {FunctionComponent} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddNewCardForm from "./AddNewCardForm";

interface AddNewCardModalProps {
	show: boolean;
	onHide: Function;
}

const AddNewCardModal: FunctionComponent<AddNewCardModalProps> = ({onHide, show}) => {
	return (
		<>
			<Modal
				show={show}
				size="lg"
				onHide={() => onHide()}
				backdrop='static'
				keyboard={false}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>ADD CARD</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddNewCardForm />
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => onHide()}>
						Close
					</Button>
					<Button variant='primary'>Understood</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddNewCardModal;
