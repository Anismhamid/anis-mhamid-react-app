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
import UpdateCardModal from "../atoms/modals/UpdateCardModal";
import DeleteUserModal from "../atoms/modals/DeleteUserModal";
import {Cards} from "../interfaces/Cards";
import {Button} from "react-bootstrap";
import {SiteTheme} from "../App";
interface CardsHomeProps {}

const CardsHome: FunctionComponent<CardsHomeProps> = () => {
	const {decodedToken} = useToken();
	const {isAdmin, isLogedIn} = useUserContext();
	const {allCards, setCards, error} = useCards();
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<SetStateAction<string>>("");
	const theme = useContext(SiteTheme);
	const onHide = useCallback(() => setOpenUpdateModal(false), []);
	const onShow = useCallback(() => setOpenUpdateModal(true), []);
	const onShowDeleteCardModal = useCallback(() => setShowDeleteModal(true), []);
	const onHideDeleteCardModal = useCallback(() => setShowDeleteModal(false), []);

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
				<div className='row'>
					{allCards.map((card: Cards) => (
						<div key={card._id} className='col-12 col-md-6 col-xl-4 my-3'>
							<div
								className='card w-100 h-100 border-0 shadow-lg rounded-lg overflow-hidden'
								style={{
									maxWidth: "26rem",
									transition: "all 0.3s ease-in-out",
								}}
							>
								<img
									className='card-img-top'
									src={card.image.url}
									alt={card.image.alt}
									style={{
										objectFit: "cover",
										height: "200px",
										transition: "transform 0.3s ease",
									}}
									onMouseOver={(e) => {
										e.currentTarget.style.transform = "scale(1.1)";
									}}
									onMouseOut={(e) => {
										e.currentTarget.style.transform = "scale(1)";
									}}
								/>
								<div className='card-body'>
									<h5 className='card-title text-center'>
										{card.title}
									</h5>
									<h6 className='card-subtitle text-center mb-2 text-muted'>
										{card.subtitle}
									</h6>
									<hr />
									<div className='card-text'>
										<h6>{card._id}</h6>
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
																: "text-light"
														} fs-4`}
													>
														{heart}
													</p>
													<sub>
														<p
															className={`${
																card.likes?.includes(
																	decodedToken?._id,
																)
																	? "text-danger"
																	: "text-light"
															} mx-1 fs-5`}
														>
															{card.likes?.length}
														</p>
													</sub>
												</div>
											</div>
											{isAdmin && (
												<div className='mt-3 d-flex justify-content-around'>
													<button
														onClick={onShow}
														className='btn btn-warning btn-sm'
													>
														Edit
													</button>

													<Button
														onClick={() => {
															onShowDeleteCardModal();
															setCardToDelete(
																card._id as string,
															);
														}}
														className='btn btn-danger btn-sm'
													>
														Delete
													</Button>
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

					<UpdateCardModal show={openUpdateModal} onHide={onHide} />
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
