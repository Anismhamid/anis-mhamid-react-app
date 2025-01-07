import {FunctionComponent} from "react";
import {Button, Modal} from "react-bootstrap";

interface SocilasModalProps {
	show: boolean;
	onHide: Function;
	bodyText: string;
	header: string;
}

const SocilasModal: FunctionComponent<SocilasModalProps> = ({
	bodyText,
	onHide,
	show,
	header,
}) => {
	return (
		<Modal
			className='modal'
			show={show}
			onHide={() => onHide()}
			backdrop='static'
			keyboard={false}
			centered
			scrollable
		>
			<Modal.Header className='bg-dark text-light' closeButton>
				<Modal.Title className='display-6 lead'>{header}</Modal.Title>
			</Modal.Header>
			<Modal.Body className='lead fs-4'>{bodyText}</Modal.Body>
			<Modal.Footer>
				<Button
					disabled
					variant='danger'
					className='text-uppercase'
					onClick={() => {}}
				>
					Connect
				</Button>
				<Button
					variant='secondary'
					className='text-uppercase '
					onClick={() => onHide()}
				>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SocilasModal;
