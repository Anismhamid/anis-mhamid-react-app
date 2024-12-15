import {
	FunctionComponent,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from "react";
import {deleteCardById, updateLikeStatus} from "../services/cardsServices";
import {useUserContext} from "../context/UserContext";
import {heart} from "../fontAwesome/Icons";
import useToken from "../hooks/useToken";
import Loading from "./Loading";
import useCards from "../hooks/useCards";
import DeleteUserModal from "../atoms/modals/DeleteUserModal";
import {Cards} from "../interfaces/Cards";
import {SiteTheme} from "../theme/theme";
import {Link} from "react-router-dom";
import {pathes} from "../routes/Routes";

interface CardsHomeProps {}

const CardsHome: FunctionComponent<CardsHomeProps> = () => {
	const {decodedToken} = useToken();
	const {isAdmin, isLogedIn,isBusiness} = useUserContext();
	const {allCards, setCards, error} = useCards();
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<SetStateAction<string>>("");
	const onShowDeleteCardModal = useCallback(() => setShowDeleteModal(true), []);
	const onHideDeleteCardModal = useCallback(() => setShowDeleteModal(false), []);
	const theme = useContext(SiteTheme);

	const handleLikeToggle = (cardId: string) => {
		const updatedCards = allCards.map((card: any) => {
			if (card._id === cardId) {
				const isLiked = card.likes.includes(decodedToken?._id);

				if (isLiked) {
					// Remove like
					card.likes = card.likes.filter(
						(id: string) => id !== decodedToken?._id,
					);
				} else {
					// Add like
					card.likes.push(decodedToken?._id);
				}

				// Update like status on the server
				updateLikeStatus(cardId, decodedToken?._id).catch((err) => {
					console.log("Failed to update like status:", err);
				});
			}
			return card;
		});

		setCards(updatedCards);
	};

	const handleDeleteCard = (id: string) => {
		deleteCardById(id)
			.then(() => setCards((prev) => prev.filter((c) => c._id !== cardToDelete)))
			.catch((err) => {
				console.log(err);
			});
	};

	if (!allCards.length) {
		return <Loading />;
	}

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<div className='container py-5 lead'>
				<h1 className='text-start my-5'>Home</h1>
				{isAdmin || isBusiness&& (
					<div className='mb-4'>
						<Link to={pathes.myCards}>
							<button className='btn btn-primary btn-lg'>
								Add New Card
							</button>
						</Link>
					</div>
				)}
				<div className='row'>
					{allCards.map((card: Cards) => (
						<div key={card._id} className='col-12 col-md-6 col-xl-4 my-3'>
							<div
								className='card2 card w-100 h-100 border-1 border-info shadow-lg rounded-lg overflow-hidden'
								style={{
									backgroundColor: theme.background,
									color: theme.color,
								}}
							>
								<Link
									to={`${pathes.cardDetails.replace(
										":cardId",
										card._id as string,
									)}`}
								>
									<img
										className='card-img-top'
										src={card.image.url}
										alt={card.image.alt}
										style={{
											height: "200px",
										}}
									/>
								</Link>
								<div className='card-body'>
									<h5 className='card-title text-center'>
										{card.title}
									</h5>
									<h6 className='card-subtitle text-center mb-2 text-secondary'>
										{card.subtitle}
									</h6>
									<hr />
									<div className='card-text'>
										<h5>Phone:</h5>
										<p>{card.phone}</p>
										<h5>Address:</h5>
										<p>
											{card.address.city},{card.address.street}
										</p>
									</div>

									{isLogedIn && decodedToken && (
										<>
											<hr />
											<div className='d-flex justify-content-between align-items-center'>
												<div className='likes-container d-flex align-items-center'>
													<p
														style={{
															backgroundColor:
																theme.background,
															color: theme.color,
														}}
														onClick={() =>
															handleLikeToggle(
																card._id as string,
															)
														}
														className={`${
															card.likes?.includes(
																decodedToken?._id,
															)
																? "text-danger"
																: ""
														} fs-4 rounded-5`}
													>
														{heart}
													</p>
													<sub>
														<p
															style={{
																backgroundColor:
																	theme.background,
																color: theme.color,
															}}
															className={`${
																card.likes?.includes(
																	decodedToken?._id,
																) && "text-danger"
															} mx-1 fs-5`}
														>
															{card.likes?.length}
														</p>
													</sub>
												</div>
											</div>
											{(isAdmin ||
												card.user_id === decodedToken._id) && (
												<div className='mt-3 d-flex justify-content-around'>
													<Link
														to={`${pathes.cardDetails.replace(
															":cardId",
															card._id as string,
														)}`}
													>
														<button className='btn btn-warning btn-sm'>
															Edit
														</button>
													</Link>
													<button
														onClick={() => {
															onShowDeleteCardModal();
															setCardToDelete(
																card._id as string,
															);
														}}
														className='btn btn-danger btn-sm'
													>
														Delete
													</button>
													{error && (
														<div className='alert alert-danger'>
															{error}
														</div>
													)}
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					))}

					<DeleteUserModal
						render={() => onHideDeleteCardModal()}
						show={showDeleteModal}
						onHide={() => onHideDeleteCardModal()}
						onDelete={() => {
							handleDeleteCard(cardToDelete as string);
						}}
					/>
				</div>
			</div>
		</main>
	);
};

export default CardsHome;
