import {
	FunctionComponent,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from "react";
import useCards from "../hooks/useCards";
import {useParams} from "react-router-dom";
import {Cards} from "../interfaces/Cards";
import {useUserContext} from "../context/UserContext";
import {SiteTheme} from "../theme/theme";
import {deleteCardById} from "../services/cardsServices";
import BackBsotton from "../atoms/BackButtons";
import DeleteUserModal from "../atoms/modals/DeleteUserModal";
import UpdateCardForm from "./UpdateCardForm";
import useToken from "../hooks/useToken";

interface CardDetailsProps {}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
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

	const handleDeleteCard = (id: string) => {
		deleteCardById(id)
			.then(() => {
				setCards((prev) => prev.filter((c) => c._id === c._id));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (!card) {
		return <p className='text-center text-danger'>Card not found.</p>;
	}

	return (
		<main
			className='py-5'
			style={{backgroundColor: theme.background, color: theme.color}}
		>
			<BackBsotton />
			<div className='w-50 m-auto my-5'>
				<img
					className='img-fluid m-auto p-1 w-100'
					src={card.image.url}
					alt={card.image.alt}
					onMouseOver={(e) => {
						e.currentTarget.style.transform = "scale(1)";
					}}
				/>
			</div>
			<div
				className='w-75 m-auto card w-100 h-100 border-1 border-info shadow-lg rounded-lg overflow-hidden my-5'
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
					<hr />
					<div className='card-text'>
						<h5>Phone:</h5>
						<p>{card.phone}</p>
						<h5>Address:</h5>
						<p>
							{card.address.city}, {card.address.street}
						</p>
					</div>

					<hr />
					<div className='card-text'>
						<h5 className='lead fw-bold'>description</h5>
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
					handleDeleteCard(cardToDelete as string);
				}}
			/>
			{isAdmin || (isLogedIn && card.user_id === decodedToken._id) ? (
				<UpdateCardForm refresh={() => {}} />
			) : null}
		</main>
	);
};

export default CardDetails;
