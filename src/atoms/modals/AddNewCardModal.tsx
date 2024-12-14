import {FunctionComponent} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddNewCardForm from "./AddNewCardForm";

interface AddNewCardModalProps {
	show: boolean;
	onHide: Function;
	refresh: Function;
}

const AddNewCardModal: FunctionComponent<AddNewCardModalProps> = ({
	onHide,
	show,
	refresh,
}) => {
	return (
		<>
			<Modal
				className='modal'
				show={show}
				size='lg'
				onHide={() => onHide()}
				backdrop='static'
				keyboard={false}
				data-bs-theme='dark'
				centered
				scrollable
			>
				<Modal.Header closeButton>
					<Modal.Title className=' text-light display-6'>Add CARD</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddNewCardForm refresh={() => refresh()} />
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						className='text-uppercase fw-bold'
						onClick={() => onHide()}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddNewCardModal;
