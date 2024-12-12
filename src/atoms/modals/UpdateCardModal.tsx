import {FunctionComponent} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UpdateCardForm from "./UpdateCardForm";

interface UpdateCardModalProps {
	show: boolean;
	onHide: Function;
}

const UpdateCardModal: FunctionComponent<UpdateCardModalProps> = ({onHide, show}) => {
	return (
		<>
			<Modal
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
					<Modal.Title className=' text-light display-6'>
						Update CARD
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UpdateCardForm />
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

export default UpdateCardModal;
