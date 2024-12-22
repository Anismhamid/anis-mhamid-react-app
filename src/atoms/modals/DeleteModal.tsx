import {FunctionComponent} from "react";
import {Button, Modal} from "react-bootstrap";
import {errorCircle} from "../../fontAwesome/Icons";
import {useNavigate} from "react-router-dom";

interface DeleteModalProps {
	show: boolean;
	onHide: Function;
	onDelete: Function;
	render: Function;
	toDelete: string;
	navigateTo: string;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
	onHide,
	show,
	onDelete,
	render,
	toDelete,
	navigateTo,
}) => {
	const navigate = useNavigate();
	return (
		<>
			<Modal
				show={show}
				onHide={() => onHide()}
				backdrop='static'
				keyboard={false}
				centered
			>
				<Modal.Header className='bg-danger' closeButton>
					<Modal.Title className={"text-warning fs-1"}>
						warning {errorCircle}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='h5 text-danger fw-bold'>
						you sure want to delet this {toDelete} ?
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => {
							onDelete();
							render();
							navigate(navigateTo || "");
							onHide()
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

export default DeleteModal;
