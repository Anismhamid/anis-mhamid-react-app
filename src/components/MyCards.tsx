import {FunctionComponent, useState, useEffect} from "react";
import {getMyCards, toggleLikeCard} from "../services/cardsServices"; // Assuming toggleLikeCard is your API function
import {Cards} from "../interfaces/Cards";
import Like from "../assets/likeButton.tsx/Like";
import Loading from "../assets/loading/Loading";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
	const [cards, setCards] = useState<Cards[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getMyCards(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ5OTM2YWY5ZDNlYTU4ZjYwOGQ1MzEiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMzMTI4Njc3fQ.kc46hW5IEWVjvCYhq9EcAvkcy2RgZGFCEAgogJIXxDQ",
		)
			.then((res) => {
				setCards(res);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	const handleLikeToggle = (cardId: string) => {
		toggleLikeCard(cardId).then((updatedCard:Cards) => {
			setCards((prevCards) =>
				prevCards.map((card) =>
					card._id === cardId ? {...card, likes: updatedCard.likes} : card,
				),
			);
		});
	};

	if (loading) return <Loading/>;

	return (
		<div className='container py-5'>
			<h2 className='text-light'>My Cards</h2>
			<div className='row'>
				{cards.map((card, index) => {
					const isLiked = card.likes.includes(card._id);
					return (
						<div key={index} className='col-12 col-md-6 col-xl-4 my-3'>
							<div
								className='card w-100 h-100 bg-dark text-light border-0 shadow-lg rounded-lg overflow-hidden'
								style={{
									maxWidth: "26rem",
									transition: "all 0.3s ease-in-out",
								}}
							>
								<div className='card mb-3'>
									<img
										className='card-img-top'
										src={card.image.url}
										alt={card.image.alt}
										style={{
											objectFit: "cover",
											height: "300px",
											transition: "transform 0.3s ease",
										}}
										onMouseOver={(e) => {
											e.currentTarget.style.transform =
												"scale(1.1)";
										}}
										onMouseOut={(e) => {
											e.currentTarget.style.transform = "scale(1)";
										}}
									/>
									<div className='card-body'>
										<p>user_id: {card.user_id}</p>
										<p>_id: {card._id}</p>
										<h5 className='card-title'>{card.title}</h5>
										<p className='card-subtitle text-center mb-2 text-muted'>
											{card.subtitle}
										</p>
										<hr />
										<p className='card-text text-start lead fw-bold'>
											phone: {card.phone}
										</p>
										<p className='card-text text-start lead fw-bold'>
											City: {card.address.city}
										</p>
										<button
											className='btn btn-outline-danger'
											onClick={() => handleLikeToggle(card._id)}
										>
											{isLiked ? "Unfavorite" : "Favorite"}
										</button>
										<hr />
										<div className='d-flex justify-content-between align-items-center'>
											<div className='likes-container d-flex align-items-center'>
												<button
													className={`btn fw-bold ${
														isLiked
															? "text-danger"
															: "text-light"
													}`}
													style={{
														transition: "color 0.3s ease",
													}}
													onClick={() =>
														handleLikeToggle(card._id)
													}
												>
													<Like />
												</button>
												<span className='mx-2 lead'>
													{card.likes.length}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MyCards;
