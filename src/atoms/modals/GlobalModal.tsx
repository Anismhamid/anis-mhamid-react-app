import {FunctionComponent} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useUserContext} from "../../context/UserContext";
import {useNavigate} from "react-router-dom";
import {pathes} from "../../routes/Routes";

interface GlobalModalProps {
	show: boolean;
	onHide: Function;
	navegateTo: Function;
	bodyText: string;
	header: string;
}

const GlobalModal: FunctionComponent<GlobalModalProps> = ({
	bodyText,
	onHide,
	show,
	header,
	navegateTo,
}) => {
	const {setIsLogedIn, setIsBusiness, setAuth, setIsAdmin} = useUserContext();
	const navigate = useNavigate();

	const handleLogout = () => {
		setAuth(null);
		setIsAdmin(false);
		setIsBusiness(false);
		setIsLogedIn(false);
		localStorage.removeItem("bCards_token");
		navigate(pathes.login);
	};

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
					<Modal.Title className=' display-6'>{header}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{bodyText}</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						className='text-success fw-bold'
						onClick={() => {
							navegateTo();
							handleLogout();
						}}
					>
						Agree
					</Button>
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

export default GlobalModal;
