import {FunctionComponent} from "react";
import {Link} from "react-router-dom";
import {pathes} from "../../routes/Routes";
import {Cards} from "../../interfaces/Cards";
import {edit, trash} from "../../fontAwesome/Icons";

interface DeleteAndEditButtonsProps {
	setCardToDelete: Function;
	card: Cards;
	onShowDeleteCardModal: Function;
}

const DeleteAndEditButtons: FunctionComponent<DeleteAndEditButtonsProps> = ({
	onShowDeleteCardModal,
	card,
	setCardToDelete,
}) => {
	return (
		<>
			<div className='mt-3 d-flex justify-content-around'>
				<Link to={`${pathes.cardDetails.replace(":cardId", card._id as string)}`}>
					<button className='btn btn-warning mx-4 w-100'>{edit}</button>
				</Link>
				<button
					onClick={() => {
						onShowDeleteCardModal();
						setCardToDelete(card._id as string);
					}}
					className='btn btn-danger mx-5 w-100'
				>
					{trash}
				</button>
			</div>
		</>
	);
};

export default DeleteAndEditButtons;
