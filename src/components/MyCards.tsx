import {FunctionComponent, useState, useEffect, useCallback, useContext} from "react";
import {deleteCardById, getMyCards, updateLikeStatus} from "../services/cardsServices";
import {heart, trash} from "../fontAwesome/Icons";
import useToken from "../hooks/useToken";
import Loading from "./Loading";
import AddNewCardModal from "../atoms/modals/AddNewCardModal";
import {Cards} from "../interfaces/Cards";
import DeleteUserModal from "../atoms/modals/DeleteUserModal";
import {SiteTheme} from "../theme/theme";
import BackBsotton from "../atoms/BackButtons";
import {Link} from "react-router-dom";
import {pathes} from "../routes/Routes";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
	const {decodedToken} = useToken();
	const [cards, setCards] = useState<Cards[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const theme = useContext(SiteTheme);

	const onHide = useCallback<Function>(() => setShowAddModal(false), []);
	const onShow = useCallback<Function>(() => setShowAddModal(true), []);
	const onHideDeleteModal = useCallback<Function>(() => setShowDeleteModal(false), []);
	const onShowDeleteModal = useCallback<Function>(() => setShowDeleteModal(true), []);

	const refresh = () => {
		onHideDeleteModal();
		onHide();
	};

	useEffect(() => {
		if (!decodedToken || !decodedToken._id) return;
		getMyCards(decodedToken._id)
			.then((res: Cards[]) => {
				setCards(
					res.map((card: Cards) => ({
						...card,
						likes: card.likes || [],
					})),
				);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, [decodedToken, cards.length, setCards, refresh]);

	const handleLikeToggle = (cardId: string) => {
		if (!decodedToken || !decodedToken._id) return;

		const updatedCards = cards.map((card: any) => {
			if (card._id === cardId) {
				const isLiked = card.likes.includes(decodedToken._id);
				const updatedLikes = isLiked
					? card.likes.filter((id: string) => id !== decodedToken._id)
					: [...card.likes, decodedToken._id];

				return {...card, likes: updatedLikes};
			}
			return card;
		});

		setCards(updatedCards);

		updateLikeStatus(cardId, decodedToken._id).catch((err) => {
			console.log("Failed to update like status:", err);
		});
	};

	const handleDeleteCard = (cardId: string) => {
		deleteCardById(cardId)
			.then(() => {
				console.log(cardId);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (loading) return <Loading />;

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<BackBsotton />
			<div className='container py-5'>
				<h2 className='lead display-5'>My Cards</h2>
				<hr className='border-light' />
				<div className='w-100'>
					<button className='w-100 bg-opacity-50' onClick={() => onShow()}>
						Add Card
					</button>
				</div>
				<div className='row'>
					{cards.length > 0 ? (
						cards.map((card: Cards, index: number) => {
							return (
								<div
									key={index}
									className='col-12 col-md-6 col-xl-4 my-3'
								>
									<div className='card w-100 h-100 bg-dark text-light border-0 shadow-lg rounded-lg overflow-hidden'>
										<Link
											to={`${pathes.cardDetails.replace(
												":cardId",
												card._id as string,
											)}`}
										>
											<img
												className='card-img-top'
												src={
													card.image?.url ||
													"default-image-url.jpg"
												}
												alt={card.image?.alt || "Card Image"}
												style={{
													objectFit: "cover",
													height: "300px",
													transition: "transform 0.3s ease",
												}}
											/>
										</Link>
										<div className='card-body'>
											<h5 className='card-title'>{card.title}</h5>
											<p className='card-subtitle text-center mb-2 text-light-emphasis'>
												{card.subtitle}
											</p>
											<hr />
											<p className='card-text text-start lead fw-bold'>
												Phone: {card.phone}
											</p>
											<div className=' text-start lead fw-bold'>
												address
												<hr className=' w-25' />
												<span className='card-text text-start lead'>
													{card.address.state}
												</span>
												,
												<span className='mx-2 card-text text-start lead'>
													{card.address.city}
												</span>
												<p className='card-text text-start lead'>
													{card.address.street},
													<span className='mx-2 card-text text-start lead'>
														{card.address.houseNumber}
													</span>
												</p>
											</div>
											<hr />
											<p className='card-subtitle text-center mb-2 text-light lead'>
												{card.description}
											</p>
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
												<DeleteUserModal
													show={showDeleteModal}
													onHide={onHideDeleteModal}
													onDelete={() =>
														handleDeleteCard(
															card._id as string,
														)
													}
													render={() => refresh()}
												/>
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
														onClick={() =>
															onShowDeleteModal()
														}
													>
														{trash}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<p>No Data</p>
					)}
				</div>
				<AddNewCardModal
					refresh={() => refresh()}
					show={showAddModal}
					onHide={onHide}
				/>
			</div>
		</main>
	);
};

export default MyCards;
