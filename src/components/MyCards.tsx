import {FunctionComponent, useState, useEffect, useCallback} from "react";
import {deleteCardById, getMyCards, updateLikeStatus} from "../services/cardsServices";
import {heart, trash} from "../fontAwesome/Icons";
import useToken from "../hooks/useToken";
import Loading from "./Loading";
import AddNewCardModal from "../atoms/modals/AddNewCardModal";
import {Cards} from "../interfaces/Cards";
import DeleteUserModal from "../atoms/modals/DeleteUserModal";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
	const {decodedToken} = useToken();
	const [cards, setCards] = useState<Cards[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const onHide = useCallback<() => void>((): void => setShowAddModal(false), []);
	const onShow = useCallback<() => void>((): void => setShowAddModal(true), []);
	const onHideDeleteModal = useCallback<() => void>(
		(): void => setShowDeleteModal(false),
		[],
	);
	const onShowDeleteModal = useCallback<() => void>(
		(): void => setShowDeleteModal(true),
		[],
	);

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
	}, [decodedToken, cards.length, setCards, onHideDeleteModal]);

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

	const refresh = () => {
		onHideDeleteModal();
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
							<div key={index} className='col-12 col-md-6 col-xl-4 my-3'>
								<div className='card w-100 h-100 bg-dark text-light border-0 shadow-lg rounded-lg overflow-hidden'>
									<img
										className='card-img-top'
										src={card.image?.url || "default-image-url.jpg"}
										alt={card.image?.alt || "Card Image"}
										style={{
											objectFit: "cover",
											height: "300px",
											transition: "transform 0.3s ease",
										}}
										onMouseOver={(e) =>
											(e.currentTarget.style.transform =
												"scale(1.1)")
										}
										onMouseOut={(e) =>
											(e.currentTarget.style.transform = "scale(1)")
										}
									/>
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
													handleDeleteCard(card._id as string)
												}
												refresh={() => refresh()}
											/>
											<button onClick={onShowDeleteModal}>
												{trash}
											</button>
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
			<AddNewCardModal show={showAddModal} onHide={onHide} />
		</div>
	);
};

export default MyCards;
