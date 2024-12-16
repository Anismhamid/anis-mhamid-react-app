import {
	FunctionComponent,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from "react";
import useCards from "../hooks/useCards";
import {useNavigate, useParams} from "react-router-dom";
import {Cards} from "../interfaces/Cards";
import {useUserContext} from "../context/UserContext";
import {SiteTheme} from "../theme/theme";
import BackBsotton from "../atoms/BackButtons";
import DeleteUserModal from "../atoms/modals/DeleteUserModal";
import UpdateCardForm from "./UpdateCardForm";
import useToken from "../hooks/useToken";
import {handleDeleteCard_Cards} from "../handleFunctions/cards";
import {pathes} from "../routes/Routes";

interface CardDetailsProps {}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
	const navigate = useNavigate();
	const {decodedToken} = useToken();
	const {isAdmin, isLogedIn} = useUserContext();
	const {allCards, setCards} = useCards();
	const [cardToDelete, setCardToDelete] = useState<SetStateAction<string>>("");
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const onShowDeleteCardModal = useCallback(() => setShowDeleteModal(true), []);
	const onHideDeleteCardModal = useCallback(() => setShowDeleteModal(false), []);
	const theme = useContext(SiteTheme);
	const {cardId} = useParams<string>();
	const card = allCards?.find((card: Cards) => card._id === cardId);

	if (!card) return <p className='text-center text-danger'>Card not found.</p>;

	return (
		<main
			className='py-5'
			style={{backgroundColor: theme.background, color: theme.color}}
		>
			<BackBsotton />
			<div className='w-25 m-auto my-5'>
				<img
					className='img-fluid m-auto p-1'
					src={card.image.url}
					alt={card.image.alt}
					onMouseOver={(e) => {
						e.currentTarget.style.transform = "scale(1)";
					}}
				/>
			</div>
			<div
				className='m-auto card border-0 shadow overflow-hidden my-5 w-75 p-3'
				style={{
					backgroundColor: theme.background,
					color: theme.color,
				}}
			>
				<div className='card-body'>
					<h5 className='card-title text-center'>{card.title}</h5>
					<h6 className='card-subtitle text-center mb-2 text-secondary'>
						{card.subtitle}
					</h6>
					<hr className='w-50 m-auto' />
					<div className='card-text mt-5'>
						<h6>Phone:</h6>
						<hr className='w-25 border-danger' />
						<p>{card.phone}</p>
						<h6>Address:</h6>
						<hr className='w-25 border-danger' />
						<p>
							{card.address.city}, {card.address.street}
						</p>
					</div>

					<div className='card-text'>
						<h6>description</h6>
						<hr className='w-25 border-danger' />
						<p className='lead '>{card.description}</p>
					</div>
					<>
						{((isLogedIn && isAdmin) ||
							(isLogedIn && card.user_id === decodedToken._id)) && (
							<div className='card-footer bg-dark'>
								<button
									onClick={() => {
										onShowDeleteCardModal();
										setCardToDelete(card._id as string);
									}}
									className='btn btn-danger'
								>
									Delete
								</button>
							</div>
						)}
					</>
				</div>
			</div>
			<DeleteUserModal
				render={() => {
					onHideDeleteCardModal();
				}}
				show={showDeleteModal}
				onHide={() => onHideDeleteCardModal()}
				onDelete={() => {
					handleDeleteCard_Cards(
						cardToDelete as string,
						setCards((prev) => prev.filter((c) => c._id === c._id)),
					);
					navigate(pathes.cards);
				}}
			/>
			{isAdmin || (isLogedIn && card.user_id === decodedToken._id) ? (
				<UpdateCardForm refresh={() => {}} />
			) : null}
		</main>
	);
};

export default CardDetails;
