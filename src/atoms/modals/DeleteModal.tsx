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
	method: string;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
	onHide,
	show,
	onDelete,
	render,
	toDelete,
	navigateTo,
	method,
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
				<Modal.Header closeButton>
					<Modal.Title className={"text-danger fs-1"}>
						{errorCircle} Delete
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='h5 text-danger fw-bold'>{toDelete} ?</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => {
							onDelete();
							render();
							navigate(navigateTo || "");
							onHide();
						}}
					>
						{method}
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
