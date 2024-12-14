import {FunctionComponent} from "react";
import {Button, Modal} from "react-bootstrap";
import {errorCircle} from "../../fontAwesome/Icons";

interface DeleteUserModalProps {
	show: boolean;
	onHide: Function;
	onDelete: Function;
	render: Function;
}

const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = ({
	onHide,
	show,
	onDelete,
	render,
}) => {
	return (
		<>
			<Modal
				show={show}
				onHide={() => onHide()}
				backdrop='static'
				keyboard={false}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='h5 text-danger fw-bold'>
						<p className=' fs-1'>{errorCircle}</p>
						warning you sure want to delet this ?
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => {
							onDelete();
							render()
						}}
					>
						DELETE
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
