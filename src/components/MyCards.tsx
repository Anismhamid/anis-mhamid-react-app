import {FunctionComponent, useState, useEffect, useCallback} from "react";
import {getMyCards, updateLikeStatus} from "../services/cardsServices";
import {heart} from "../fontAwesome/Icons";
import useToken from "../hooks/useToken";
import Loading from "./Loading";
import AddNewCardModal from "../atoms/modals/AddNewCardModal";
import {Cards} from "../interfaces/Cards";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
	const {decodedToken} = useToken();
	const [cards, setCards] = useState<Cards[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [showAddModal, setShowAddModal] = useState(false);
	const [likeColors, setLikeColors] = useState<{[cardId: string]: string}>({});

	const onHide = useCallback<() => void>((): void => setShowAddModal(false), []);
	const onShow = useCallback<() => void>((): void => setShowAddModal(true), []);

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
	}, [decodedToken, cards.length, setCards]);

	const handleLikeToggle = (cardId: string) => {
		if (!decodedToken || !decodedToken._id) return;

		const updatedCards = cards.map((card: any) => {
			if (card._id === cardId) {
				const isLiked = card.likes.includes(decodedToken._id);
				const updatedLikes = isLiked
					? card.likes.filter((id: string) => id !== decodedToken._id)
					: [...card.likes, decodedToken._id];

				setLikeColors((prevColors) => ({
					...prevColors,
					[card._id]: isLiked ? "text-light" : "text-danger",
				}));

				return {...card, likes: updatedLikes};
			}
			return card;
		});

		setCards(updatedCards);

		updateLikeStatus(cardId, decodedToken._id).catch((err) => {
			console.log("Failed to update like status:", err);
		});
	};

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
					cards.map((card: any, index: number) => {
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
										<p>card: {card.likes.length}</p>
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
												<p
													onClick={() =>
														handleLikeToggle(card._id)
													}
													className={`${
														likeColors[card._id] ||
														"text-light"
													} fs-1`} // Use the color from state
												>
													{heart}
												</p>
												<p
													className={`${
														likeColors[card._id] ||
														"text-light"
													} mx-3`}
												>
													{card.likes.length}
												</p>
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
