import {FunctionComponent, useEffect, useState} from "react";
import Loading from "../assets/loading/Loading";
import useToken from "../customHooks/useToken";
import {getLikedCardById, updateLikeStatus} from "../services/cardsServices";
import { heart } from "../fontAwesome/Icons";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
	const [cards, setCards] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const {decodedToken} = useToken();

	useEffect(() => {
		if (!decodedToken._id) {
			setLoading(false);
			return;
		}
		getLikedCardById(decodedToken._id)
			.then((res) => {
				const liked = res.filter((card:any) => card.likes.includes(decodedToken._id));
				setCards(liked);
				setLoading(false);
			})
			.catch(() => {
				console.log("Failed to fetch cards.");
				setLoading(false);
			});
	}, [decodedToken,cards]);

	const handleLikeToggle = (cardId: string) => {
		const updatedCards = cards.map((card:any) => {
			if (card._id === cardId) {
				const isLiked:any = card.likes.includes(decodedToken._id);
				if (isLiked) {
					// User is unliking the card
					card.likes = card.likes.filter((id:string) => id !== decodedToken._id);
				} else {
					// User is liking the card
					card.likes.push(decodedToken._id);
				}

				updateLikeStatus(cardId, decodedToken._id).catch((err) => {
					console.log("Failed to update like status:", err);
				});
			}
			return card;
		});

		// Update the state with the new list of cards
		setCards(updatedCards);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='container py-5'>
			<h2 className='text-light'>My favorite Business Cards</h2>
			<div className='row'>
				{cards.map((card:any, index:number) => {
					const isLiked = card.likes.includes(decodedToken._id);
					const likeColor = isLiked ? "text-danger" : "text-dark";

					return (
						<div key={index} className='col-12 col-md-6 col-xl-4 my-3'>
							<div
								className='card w-100 h-100 bg-dark text-light border-0 shadow-lg rounded-lg overflow-hidden'
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
										height: "300px",
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
									<div className='d-flex justify-content-between align-items-center'>
										<div className='likes-container d-flex align-items-center'>
											<p
												onClick={() => handleLikeToggle(card._id as string)}
												className={`${likeColor} fs-1`}
											>
												{heart}
											</p>
											<p className={`${likeColor} mx-3`}>
												{card.likes.length}
											</p>
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

export default FavCards;
