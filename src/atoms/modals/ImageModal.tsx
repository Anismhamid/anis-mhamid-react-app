import {FunctionComponent} from "react";
import {Modal} from "react-bootstrap";

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
	return (
		<Modal show={show} onHide={() => onHide()} fullscreen={true}>
			<Modal.Header closeButton />
			<img
				key={image}
				className=' img-fluid w-100 m-auto'
				src={image}
				alt={imageName}
				style={{width: "100%", height: "auto"}}
			/>
		</Modal>
	);
};

export default ImageModal;
