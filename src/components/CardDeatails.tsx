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
import DeleteModal from "../atoms/modals/DeleteModal";
import UpdateCardForm from "./UpdateCardForm";
import useToken from "../hooks/useToken";
import {handleDeleteCard_Cards, handleLikeToggle_MyCards} from "../handleFunctions/cards";
import Loading from "./Loading";
import Button from "../atoms/buttons/Button";
import NextCardButton from "../atoms/buttons/NextCardButton";
import {heart} from "../fontAwesome/Icons";
import {pathes} from "../routes/Routes";

interface CardDetailsProps {}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
	const onHideDeleteCardModal = useCallback(() => setShowDeleteModal(false), []);
	const onShowDeleteCardModal = useCallback(() => setShowDeleteModal(true), []);
	const [cardToDelete, setCardToDelete] = useState<SetStateAction<string>>("");
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const {isAdmin, isLogedIn} = useUserContext();
	const {allCards, setCards} = useCards();
	const {cardId} = useParams<string>();
	const theme = useContext(SiteTheme);
	const navigate = useNavigate();
	const {decodedToken} = useToken();
	const card = allCards?.find((card: Cards) => card._id === cardId);

	if (!card) return <Loading />;

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<div className='row w-100'>
				<div className='col-md-4 col-lg-3'>
					<h6
						style={{backgroundColor: theme.background}}
						className='lead display-5 p-3 fw-bold rounded-5 border'
					>
						Card Details
					</h6>
				</div>
			</div>

			<hr />
			<Button text='Home' path={() => navigate(pathes.cards)} />
			<div className='card-details-image'>
				<img
					style={{
						height: "300px",
					}}
					className='img-fluid'
					src={card.image.url}
					alt={card.image.alt}
				/>
			</div>

			<NextCardButton />
			<div
				className='m-auto	custom-border rounded-3 card shadow overflow-hidden my-5 w-75 p-3'
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
					<div className='container w-25 d-flex align-items-center justify-content-center'>
						<p
							onClick={() =>
								handleLikeToggle_MyCards(
									card._id as string,
									decodedToken,
									allCards,
									setCards,
								)
							}
							className={`${
								card.likes?.includes(decodedToken?._id)
									? "text-danger"
									: "text-dark"
							} fs-2 text-center`}
						>
							{heart}
						</p>
						<p
							className={`${
								card.likes?.includes(decodedToken?._id)
									? "text-danger"
									: "text-dark"
							} mx-1 text-center`}
						>
							Likes
						</p>
						<p
							className={`${
								card.likes?.includes(decodedToken?._id)
									? "text-danger"
									: "text-dark"
							} mx-1 fs-5 text-csnter`}
						>
							{card.likes?.length}
						</p>
					</div>
					<div className='row'>
						<div className='col-12'>
							<div className='card-text mt-5'>
								<h6>
									Phone\{" "}
									<a href={`tel:+972${card.phone.slice(1)}`}>
										{card.phone}
									</a>
								</h6>
								<hr className='w-25 border-danger' />
								<h6>
									Address\ {card.address.city}, {card.address.street}
								</h6>
								<hr className='w-25 border-danger' />
							</div>

							<div className='card-text'>
								<h6>description</h6>
								<hr className='w-25 border-danger' />
								<p className='lead '>{card.description}</p>
							</div>
						</div>
						<div className='row'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13424.14129243641!2d35.176770531207595!3d32.7382527280794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151db255b165af1b%3A0x229654d621e08c5e!2z15TXqNeZINeg16bXqNeqINeq15nXqNei158!5e0!3m2!1siw!2sil!4v1734360541093!5m2!1siw!2sil'
								width='400'
								height='350'
								className='border-0'
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
							></iframe>
						</div>
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
			<div className='container-sm'>
				{isAdmin || (isLogedIn && card.user_id === decodedToken._id) ? (
					<>
						<hr className=' mb-4' />
						<h6 className=' display-6 mx-3'>Edit Card</h6>
						<UpdateCardForm refresh={() => {}} />
					</>
				) : null}
			</div>
			<DeleteModal
				method='Delete Card'
				toDelete='Are you sure you want to Delete This Card? this card will be permanently removed. This action cannot be undone.'
				render={() => onHideDeleteCardModal()}
				show={showDeleteModal}
				onHide={() => onHideDeleteCardModal()}
				onDelete={() => {
					handleDeleteCard_Cards(
						cardToDelete as string,
						setCards((prev) => prev.filter((c) => c._id !== cardToDelete)),
					);
				}}
				navigateTo={"-1"}
			/>
		</main>
	);
};

export default CardDetails;
