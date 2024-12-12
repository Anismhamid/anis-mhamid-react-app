import {FunctionComponent} from "react";
import {Button, Modal} from "react-bootstrap";
import {errorCircle} from "../../fontAwesome/Icons";

interface DeleteUserModalProps {
	show: boolean;
	onHide: Function;
	onDelete: Function;
	refresh: Function;
}

const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = ({
	onHide,
	show,
	onDelete,
	refresh,
}) => {
	return (
		<>
			<Modal show={show} onHide={() => onHide()} backdrop='static' keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Delete User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='h5 text-danger fw-bold'>
						<p className=' fs-1'>{errorCircle} WARNING!</p>
						warning you sure want to delet this user?
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => {
							onDelete();
							refresh();
						}}
					>
						DELETE USER
					</Button>
					<Button variant='secondary' onClick={() => onHide()}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DeleteUserModal;
