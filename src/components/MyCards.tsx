import {FunctionComponent, useState, useEffect, useCallback} from "react";
import {getMyCards, updateLikeStatus} from "../services/cardsServices";
import {Cards} from "../interfaces/Cards";
import Like from "../assets/likeButton.tsx/Like";
import Loading from "../assets/loading/Loading";
import useToken from "../customHooks/useToken";
import AddNewCardModal from "../assets/modals/cards/AddNewCardModal";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
	const [cards, setCards] = useState<Cards[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [likeColor] = useState<string>("");
	const {decodedToken} = useToken();
	const [showAddModal, setShowAddModal] = useState(false);

	const onHide = useCallback<() => void>((): void => setShowAddModal(false), []);
	const onShow = useCallback<() => void>((): void => setShowAddModal(true), []);

	// Fetching the users cards
	useEffect(() => {
		if (!decodedToken || !decodedToken._id) return;
		getMyCards(decodedToken._id)
			.then((res:Cards[]) => {
				setCards(res);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, [decodedToken]);



	// Handle like
	const handleLikeToggle = useCallback(
		(cardId: string) => {
			if (!decodedToken?._id) return; // Checcking if the user is authenticated
			updateLikeStatus(cardId, decodedToken._id).then((updatedCard: Cards) => {
				setCards((prevCards) =>
					prevCards.map((card) =>
						card._id === cardId ? {...card, likes: updatedCard.likes} : card,
					),
				);
			});
		},
		[decodedToken],
	);

	if (loading) return <Loading />;

	return (
		<div className='container py-5'>
			<h2 className='text-light'>My Cards</h2>
			<hr className='border-light' />
			<div className='w-100'>
				<button className='w-100 bg-opacity-50' onClick={() => onShow()}>
					Add Card
				</button>
			</div>
			<div className='row'>
				{cards.length > 0 ? (
					cards.map((card) => {
						return (
							<div key={card._id} className='col-12 col-md-6 col-xl-4 my-3'>
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
										<p>User ID: {card.user_id}</p>
										<p>ID: {card._id}</p>
										<h5 className='card-title'>{card.title}</h5>
										<p className='card-subtitle text-center mb-2 text-muted'>
											{card.subtitle}
										</p>
										<hr />
										<p className='card-text text-start lead fw-bold'>
											Phone: {card.phone}
										</p>
										<p className='card-text text-start lead fw-bold'>
											City: {card.address.city}
										</p>
										<hr />
										<div className='d-flex justify-content-between align-items-center'>
											<div className='likes-container d-flex align-items-center'>
												<Like
													likeColor={likeColor}
													buttonId={card._id}
													likesLength={card.likes.length}
													onClick={() =>
														handleLikeToggle(card._id)
													}
												/>
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
			<AddNewCardModal show={showAddModal} onHide={onHide} />
		</div>
	);
};

export default MyCards;
