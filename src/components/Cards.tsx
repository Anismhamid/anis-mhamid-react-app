import {
	FunctionComponent,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {useUserContext} from "../context/UserContext";
import {heart} from "../fontAwesome/Icons";
import useToken from "../hooks/useToken";
import Loading from "./Loading";
import useCards from "../hooks/useCards";
import DeleteModal from "../atoms/modals/DeleteModal";
import {Cards} from "../interfaces/Cards";
import {SiteTheme} from "../theme/theme";
import {Link} from "react-router-dom";
import {pathes} from "../routes/Routes";
import {
	handleDeleteCard_Cards,
	handleLikeToggle_Cards,
	handleSearch,
} from "../handleFunctions/cards";
import {Pagination} from "react-bootstrap";
import DeleteAndEditButtons from "../atoms/buttons/DeleteAndEditButtons";
import ImageModal from "../atoms/modals/ImageModal";

interface CardsHomeProps {}

const CardsHome: FunctionComponent<CardsHomeProps> = () => {
	const cardsPerPage = 9;
	const {decodedToken} = useToken();
	const theme = useContext(SiteTheme);
	const {allCards, setCards} = useCards();
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const {isAdmin, setIsLogedIn, isBusiness} = useUserContext();
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<SetStateAction<string>>("");
	const [onShowImageModal, setOnShowImageModal] = useState<boolean>(false);
	const [cardImageUrl, setCardImageUrl] = useState<string>("");
	const [cardImageAlt, setCardImageAlt] = useState<string>("");

	const OnShowImageCardModal = useCallback(() => setOnShowImageModal(true), []);
	const OnHideImageCardModal = () => {
		setOnShowImageModal(false);
		setCardImageUrl("");
		setCardImageAlt("");
	};
	const onShowDeleteCardModal = useCallback(() => setShowDeleteModal(true), []);
	const onHideDeleteCardModal = useCallback(() => setShowDeleteModal(false), []);

	useEffect(() => {
		const token = localStorage.getItem("bCards_token") ;
		setIsLogedIn(!!token);
	}, [decodedToken]);

	const startIndex = (currentPage - 1) * cardsPerPage;

	const filteredCards = useMemo(() => {
		setIsLoading(true);
		const query = searchTerm.trim().toLowerCase();

		return allCards.filter((card) => {
			const cardName = `${card.title}`.toLowerCase();
			const phone = card.phone.toLowerCase();
			// const country = card.address.country.toLowerCase();
			const email = card.email.toLowerCase();
			setIsLoading(false);

			return (
				cardName.includes(query) || phone.includes(query) || email.includes(query)
				// country.includes(query)
			);
		});
	}, [allCards, searchTerm]);

	const currentCards = useMemo(() => {
		return filteredCards.slice(startIndex, startIndex + cardsPerPage);
	}, [filteredCards, startIndex]);

	const paginationItems = useMemo(() => {
		const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

		return [...Array(totalPages)].map((_, index) => (
			<Pagination.Item
				key={index}
				active={currentPage === index + 1}
				onClick={() => setCurrentPage(index + 1)}
			>
				{index + 1}
			</Pagination.Item>
		));
	}, [currentPage, filteredCards.length]);

	if (isLoading) return <Loading />;

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<div className='container py-5 lead'>
				{isBusiness && (
					<div className='mb-4'>
						<Link to={pathes.myCards}>
							<button className='btn btn-dark btn-sm'>Add New Card</button>
						</Link>
					</div>
				)}
				{/* Search Bar */}
				<div className=' rounded-3 p-2'>
					<label htmlFor='searchCard' className='mb-2 display-6'>
						Search
					</label>
					<form
						className='d-flex me-3'
						onSubmit={handleSearch}
						aria-label='Search cards'
					>
						<input
							id='searchCard'
							name='searchCard'
							className='form-control me-2 search-input'
							type='search'
							placeholder='card name   |   phone   |   email   |   country'
							aria-label='Search'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</form>
				</div>
				<hr />
				{/* Pagination */}
				<div className='container-sm mt-3'>
					<Pagination className='m-auto w-100 d-flex justify-content-center mb-3 flex-wrap'>
						{paginationItems}
					</Pagination>
				</div>
				<h1 className='text-center my-5'>Home</h1>
				<hr />

				<div className='row ms-auto'>
					<div className='row'>
						{currentCards.map((card: Cards) => (
							<div key={card._id} className='col-12 col-md-6 col-xl-4 my-3'>
								<div
									className='custom-border card2 card w-100 h-100 border-1 shadow-lg rounded-lg overflow-hidden'
									style={{
										backgroundColor: theme.background,
										color: theme.color,
									}}
								>
									<img
										onClick={() => {
											setCardImageUrl(card.image.url);
											setCardImageAlt(card.image.alt);
											OnShowImageCardModal();
										}}
										className='card-img-top img'
										src={card.image.url}
										alt={card.image.alt}
										style={{
											height: "300px",
											cursor: "pointer",
										}}
									/>

									<div className='card-body'>
										<h5 className='card-title text-center'>
											<Link
												className=' text-decoration-none'
												to={`${pathes.cardDetails.replace(
													":cardId",
													card._id as string,
												)}`}
											>
												{card.title}
											</Link>
										</h5>
										<h6 className='card-subtitle text-center mb-2 text-secondary'>
											{card.subtitle}
										</h6>
										<hr />
										<div className='card-text'>
											<h5>Phone:</h5>
											<p>{card.phone}</p>
											<h5>Address:</h5>
											{/* <p>
												{card.address.city},{card.address.street}
											</p> */}
											<h5>{card.email}</h5>
										</div>

										{decodedToken._id && (
											<>
												<hr />
												<div className='d-flex justify-content-between align-items-center'>
													<div className='likes-container d-flex align-items-center'>
														<button
															style={{
																backgroundColor:
																	theme.background,
																color: theme.color,
															}}
															onClick={() =>
																handleLikeToggle_Cards(
																	card._id as string,
																	allCards,
																	decodedToken?._id,
																	setCards,
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
															{heart} {card.likes?.length}
														</button>
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
															></p>
														</sub>
													</div>
												</div>
												{(isAdmin ||
													card.user_id ===
														decodedToken._id) && (
													<div className='mt-3 d-flex justify-content-around'>
														<DeleteAndEditButtons
															setCardToDelete={() => {
																setCardToDelete(
																	card._id as string,
																);
															}}
															card={card}
															onShowDeleteCardModal={() =>
																onShowDeleteCardModal()
															}
														/>
													</div>
												)}
											</>
										)}
									</div>
								</div>
								<ImageModal
									show={onShowImageModal}
									onHide={() => {
										OnHideImageCardModal();
									}}
									image={cardImageUrl}
									imageName={cardImageAlt}
								/>
							</div>
						))}
						<DeleteModal
							method={"Delete"}
							navigateTo={""}
							toDelete='CardAre you sure you want to Delete This Card? this card will be permanently removed. This action cannot be undone.'
							render={() => onHideDeleteCardModal()}
							show={showDeleteModal}
							onHide={() => onHideDeleteCardModal()}
							onDelete={() => {
								handleDeleteCard_Cards(
									cardToDelete as string,
									setCards((prev) =>
										prev.filter((c) => c._id !== cardToDelete),
									),
								);
							}}
						/>
					</div>
				</div>
				{/* Pagination */}
				<div className='container-sm mt-3'>
					<Pagination className='m-auto w-100 d-flex justify-content-center mb-3 flex-wrap'>
						{paginationItems}
					</Pagination>
				</div>
			</div>
		</main>
	);
};

export default CardsHome;
