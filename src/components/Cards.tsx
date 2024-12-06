import {FunctionComponent, useCallback, useEffect, useState} from "react";
import {getAllCards, updateLikeStatus} from "../services/cardsServices";
import {Cards} from "../interfaces/Cards";
import Loading from "../assets/loading/Loading";
import {useUserContext} from "../context/UserContext";
import useToken from "../customHooks/useToken";
import {errorMSG} from "../assets/taosyify/Toastify";
import AddNewCardModal from "../assets/modals/cards/AddNewCardModal";
import Like from "../assets/likeButton.tsx/Like";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const {decodedToken} = useToken();
	const {isAdmin, isLogedIn} = useUserContext();
	const [cards, setCards] = useState<Cards[]>([]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [likeColors, setLikeColors] = useState<{[key: string]: string}>({});

	const onHide = useCallback<() => void>((): void => setShowAddModal(false), []);
	const onShow = useCallback<() => void>((): void => setShowAddModal(true), []);

	useEffect(() => {
		getAllCards()
			.then((res) => {
				if (res) {
					setCards(res);
				} else {
					errorMSG("No cards data to show");
				}
			})
			.catch((err) => {
				errorMSG("Failed to load cards. Please try again later.");
				console.log("Error fetching cards:", err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [isLogedIn, decodedToken, isAdmin]);

	const handleLikeToggle = (cardId: string) => {
		if (!decodedToken || !decodedToken._id) return;

		const updatedCards = cards.map((card) => {
			if (card._id === cardId) {
				const isLiked = card.likes.includes(decodedToken._id);

				if (isLiked) {
					// Remove like
					card.likes = card.likes.filter((id) => id !== decodedToken._id);
				} else {
					// Add like
					card.likes.push(decodedToken._id);
				}

				// Update the color of the like button based on the action
				setLikeColors((prevColors) => ({
					...prevColors,
					[card._id]: isLiked ? "text-dark" : "text-danger",
				}));

				// Update the backend with the like status
				updateLikeStatus(cardId, decodedToken._id).catch((err) => {
					console.log("Failed to update like status:", err);
				});
			}
			return card;
		});

		setCards(updatedCards);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='container py-5'>
			<h1 className='text-center text-light mt-5'>Cards</h1>
			<hr className='border-light' />
			<div className='w-100'>
				<button className='w-100 bg-opacity-50' onClick={() => onShow()}>
					Add Card
				</button>
			</div>
			<div className='row'>
				{cards.length > 0 ? (
					cards.map((card) => {
						// Get the like color for each card from the state
						const likeColor = likeColors[card._id] || "text-light"; // Default like color is dark

						return (
							<div key={card._id} className='col-12 col-md-6 col-xl-4 my-3'>
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
											height: "200px",
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
										<h5 className='card-title text-center'>
											{card.title}
										</h5>
										<h6 className='card-subtitle text-center mb-2 text-muted'>
											{card.subtitle}
										</h6>
										<hr />
										<div className='card-text'>
											<h5>Phone:</h5>
											<p>{card.phone}</p>
											<h5>Address:</h5>
											<p>{card.address.city}</p>
										</div>

										{isLogedIn && decodedToken && (
											<div>
												<hr />
												<div className='d-flex justify-content-between align-items-center'>
													<div className='likes-container d-flex align-items-center'>
														<Like
															onClick={() =>
																handleLikeToggle(card._id)
															}
															likeColor={likeColor}
															buttonId={card._id}
															likesLength={
																card.likes.length
															}
														/>
													</div>
												</div>
												{isAdmin && (
													<div className='mt-3 d-flex justify-content-around'>
														<button className='btn btn-warning btn-sm'>
															Edit
														</button>
														<button className='btn btn-danger btn-sm'>
															Delete
														</button>
													</div>
												)}
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})
				) : (
					<p className='text-center text-light'>No cards available</p>
				)}
			</div>
			<AddNewCardModal show={showAddModal} onHide={onHide} />
		</div>
	);
};

export default Home;
