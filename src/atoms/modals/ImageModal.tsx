import {FunctionComponent, useContext} from "react";
import {Modal} from "react-bootstrap";
import {SiteTheme, theme} from "../../theme/theme";

interface ImageModalProps {
	show: boolean;
	onHide: () => void;
	image: string;
	imageName: string;
}

const ImageModal: FunctionComponent<ImageModalProps> = ({
	onHide,
	image,
	imageName,
	show,
}) => {
	const theme = useContext(SiteTheme);
	return (
		<Modal show={show} onHide={() => onHide()} fullscreen={true}>
			<Modal.Header
				closeButton
				style={{background: theme.background, color: theme.color}}
			/>
			<Modal.Body
				style={{background: theme.background, color: theme.color}}
				className=' d-flex justify-content-center align-items-center'
			>
				<img
					key={image}
					className='m-auto'
					src={image}
					alt={imageName}
					style={{
						maxWidth: "100%",
						maxHeight: "100%",
						objectFit: "contain",
					}}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default ImageModal;
