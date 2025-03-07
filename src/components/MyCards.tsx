import {FunctionComponent, useState, useEffect, useContext, SetStateAction} from "react";
import {getMyCards} from "../services/cardsServices";
import {heart} from "../fontAwesome/Icons";
import useToken from "../hooks/useToken";
import Loading from "./Loading";
import AddNewCardModal from "../atoms/modals/AddNewCardModal";
import {Cards} from "../interfaces/Cards";
import {SiteTheme} from "../theme/theme";
import {Link, useNavigate} from "react-router-dom";
import {pathes} from "../routes/Routes";
import {handleDeleteCard_Cards, handleLikeToggle_MyCards} from "../handleFunctions/cards";
import Button from "../atoms/buttons/Button";
import DeleteModal from "../atoms/modals/DeleteModal";
import DeleteAndEditButtons from "../atoms/buttons/DeleteAndEditButtons";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
	const navigate = useNavigate();
	const {decodedToken} = useToken();
	const theme = useContext(SiteTheme);
	const [cards, setCards] = useState<Cards[]>([]);
	const [render, setRender] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<SetStateAction<string>>("");

	const onHideDeleteModal = () => setShowDeleteModal(false);
	const onShowDeleteModal = () => setShowDeleteModal(true);
	const onHide = () => setShowAddModal(false);
	const onShow = () => setShowAddModal(true);

	const refresh = () => {
		onHideDeleteModal();
		onHide();
		setRender(true);
	};

	useEffect(() => {
		if (!decodedToken || !decodedToken._id) return;
		getMyCards()
			.then((res: Cards[]) => {
				setCards(
					res.reverse().map((card: Cards) => ({
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
	}, [decodedToken, render]);

	if (loading) return <Loading />;

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<Button text='Back' path={() => navigate(pathes.cards)} />
			<h6 className='lead display-5 my-3 fw-bold'>My Cards</h6>
			<hr className=' w-25' />
			<div className='container py-5'>
				<div className='w-100'>
					<button onClick={() => onShow()}>Add Card</button>
				</div>
				<div className='row'>
					{cards.length > 0 ? (
						cards.map((card: Cards, index: number) => {
							return (
								<div
									key={index}
									className='col-12 col-md-6 col-xl-4 my-3'
								>
									<div
										style={{
											backgroundColor: theme.background,
											color: theme.color,
										}}
										className='custom-border card2 card w-100 h-100 border-1 shadow-lg rounded-lg overflow-hidden'
									>
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
													{card.address?.state},
												</span>
												<span className='mx-2 card-text text-start '>
													{card.address?.city}
												</span>
												<p className='card-text text-start lead'>
													{card.address?.street},
													<span className='mx-2 card-text text-start'>
														{card.address?.houseNumber}
													</span>
													<span className='mx-2 card-text text-start'>
														{card.address?.zip}
													</span>
												</p>
											</div>
											<hr />
											<p className='card-subtitle text-center mb-2 lead'>
												{card.description}
											</p>
											<hr />
											<div className='d-flex justify-content-between align-items-center'>
												<div className='likes-container d-flex align-items-center'>
													<p
														onClick={() =>
															handleLikeToggle_MyCards(
																card._id as string,
																decodedToken,
																cards,
																setCards,
															)
														}
														className={`${
															card.likes?.includes(
																decodedToken?._id,
															)
																? "text-danger"
																: ""
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
																	: ""
															} mx-1 fs-5`}
														>
															{card.likes?.length}
														</p>
													</sub>
												</div>
												<div className='mt-3 d-flex justify-content-around'>
													<DeleteAndEditButtons
														onShowDeleteCardModal={() =>
															onShowDeleteModal()
														}
														setCardToDelete={() =>
															setCardToDelete(
																card._id as string,
															)
														}
														card={card}
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
				<DeleteModal
					method='Delete'
					navigateTo={""}
					toDelete='CardAre you sure you want to Delete This Card? this card will be permanently removed. This action cannot be undone.'
					render={() => onHideDeleteModal()}
					show={showDeleteModal}
					onHide={() => onHideDeleteModal()}
					onDelete={() => {
						handleDeleteCard_Cards(
							cardToDelete as string,
							setCards((prev) =>
								prev.filter((c) => c._id !== cardToDelete),
							),
						);
					}}
				/>
				<AddNewCardModal
					show={showAddModal}
					refresh={() => refresh()}
					onHide={() => onHide()}
				/>
			</div>
		</main>
	);
};

export default MyCards;
