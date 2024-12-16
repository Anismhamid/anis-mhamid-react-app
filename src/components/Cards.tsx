import {
	FunctionComponent,
	SetStateAction,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import {useUserContext} from "../context/UserContext";
import {heart} from "../fontAwesome/Icons";
import useToken from "../hooks/useToken";
import Loading from "./Loading";
import useCards from "../hooks/useCards";
import DeleteModal from "../atoms/modals/DeleteUserModal";
import {Cards} from "../interfaces/Cards";
import {SiteTheme} from "../theme/theme";
import {Link} from "react-router-dom";
import {pathes} from "../routes/Routes";
import {
	handleDeleteCard_Cards,
	handleLikeToggle_Cards,
	handleSearch,
} from "../handleFunctions/cards";

interface CardsHomeProps {}

const CardsHome: FunctionComponent<CardsHomeProps> = () => {
	const {decodedToken} = useToken();
	const theme = useContext(SiteTheme);
	const {allCards, setCards, error} = useCards();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const {isAdmin, isLogedIn, isBusiness} = useUserContext();
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<SetStateAction<string>>("");
	const onShowDeleteCardModal = useCallback(() => setShowDeleteModal(true), []);
	const onHideDeleteCardModal = useCallback(() => setShowDeleteModal(false), []);

	const filteredCards = useMemo(() => {
		const query = searchTerm.trim().toLowerCase();

		return allCards.filter((card) => {
			const cardName = `${card.title}`.toLowerCase();
			const phone = card.phone.toLowerCase();
			const country = card.address.country.toLowerCase();
			const email = card.email?.toLowerCase() || "";
			return (
				cardName.includes(query) ||
				phone.includes(query) ||
				email.includes(query) ||
				country.includes(query)
			);
		});
	}, [searchTerm]);

	if (!allCards.length) {
		return <Loading />;
	}

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<div className='container py-5 lead'>
				{/* Search Bar */}
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
						placeholder='card name /phone /email /country'
						aria-label='Search'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</form>
				<h1 className='text-start my-5'>Home</h1>
				<div className='row'>
					{searchTerm && filteredCards.length > 0 ? (
						filteredCards.map((card) => (
							<div key={card._id} className='col-12 col-md-6 col-xl-4 my-3'>
								<div
									className='card2 card w-100 h-100 border-1 border-info shadow-lg rounded-lg overflow-hidden'
									style={{
										backgroundColor: theme.background,
										color: theme.color,
									}}
								>
									<Link
										to={`${pathes.cardDetails.replace(
											":cardId",
											card._id as string,
										)}`}
									>
										<img
											className='card-img-top'
											src={card.image.url}
											alt={card.image.alt}
											style={{
												height: "200px",
											}}
										/>
									</Link>
									<div className='card-body'>
										<h5 className='card-title text-center'>
											{card.title}
										</h5>
										<h6 className='card-subtitle text-center mb-2 text-secondary'>
											{card.subtitle}
										</h6>
										<hr />
										<div className='card-text'>
											<h5>Phone:</h5>
											<p>{card.phone}</p>
											<h5>Address:</h5>
											<p>
												{card.address.city},{card.address.street}
											</p>
											<p>{card.email}</p>
										</div>

										{isLogedIn && decodedToken && (
											<>
												<hr />
												<div className='d-flex justify-content-between align-items-center'>
													<div className='likes-container d-flex align-items-center'>
														<p
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
															{heart}
														</p>
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
															>
																{card.likes?.length}
															</p>
														</sub>
													</div>
												</div>
												{(isAdmin ||
													card.user_id ===
														decodedToken._id) && (
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
															onClick={() => {
																onShowDeleteCardModal();
																setCardToDelete(
																	card._id as string,
																);
															}}
															className='btn btn-danger btn-sm'
														>
															Delete
														</button>
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
						))
					) : (
						<></>
					)}
					{isAdmin || isBusiness ? (
						<div className='mb-4'>
							<Link to={pathes.myCards}>
								<button className='btn btn-dark btn-sm'>
									Add New Card
								</button>
							</Link>
						</div>
					) : (
						<></>
					)}
					<div className='row'>
						{allCards.map((card: Cards) => (
							<div key={card._id} className='col-12 col-md-6 col-xl-4 my-3'>
								<div
									className='card2 card w-100 h-100 border-1 border-info shadow-lg rounded-lg overflow-hidden'
									style={{
										backgroundColor: theme.background,
										color: theme.color,
									}}
								>
									<Link
										to={`${pathes.cardDetails.replace(
											":cardId",
											card._id as string,
										)}`}
									>
										<img
											className='card-img-top'
											src={card.image.url}
											alt={card.image.alt}
											style={{
												height: "200px",
											}}
										/>
									</Link>
									<div className='card-body'>
										<h5 className='card-title text-center'>
											{card.title}
										</h5>
										<h6 className='card-subtitle text-center mb-2 text-secondary'>
											{card.subtitle}
										</h6>
										<hr />
										<div className='card-text'>
											<h5>Phone:</h5>
											<p>{card.phone}</p>
											<h5>Address:</h5>
											<p>
												{card.address.city},{card.address.street}
											</p>
											<h5>{card.email}</h5>
										</div>

										{isLogedIn && decodedToken && (
											<>
												<hr />
												<div className='d-flex justify-content-between align-items-center'>
													<div className='likes-container d-flex align-items-center'>
														<p
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
															{heart}
														</p>
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
															>
																{card.likes?.length}
															</p>
														</sub>
													</div>
												</div>
												{(isAdmin ||
													card.user_id ===
														decodedToken._id) && (
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
															onClick={() => {
																onShowDeleteCardModal();
																setCardToDelete(
																	card._id as string,
																);
															}}
															className='btn btn-danger btn-sm'
														>
															Delete
														</button>
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

						<DeleteModal
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
			</div>
		</main>
	);
};

export default CardsHome;
