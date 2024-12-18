import {FunctionComponent, useContext, useEffect, useState} from "react";
import {getLikedCardById} from "../services/cardsServices";
import {heart} from "../fontAwesome/Icons";
import useToken from "../hooks/useToken";
import Loading from "./Loading";
import {Cards} from "../interfaces/Cards";
import {Link} from "react-router-dom";
import {SiteTheme} from "../theme/theme";
import {pathes} from "../routes/Routes";
import {handleLikeToggle_Cards} from "../handleFunctions/cards";
import Button from "../atoms/buttons/Button";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
	const [cards, setCards] = useState<Cards[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const {decodedToken} = useToken();
	const theme = useContext(SiteTheme);

	useEffect(() => {
		if (!decodedToken._id) {
			setLoading(false);
			return;
		}
		getLikedCardById(decodedToken._id)
			.then((res) => {
				const liked = res.filter((card: any) =>
					card.likes.includes(decodedToken._id),
				);
				setCards(liked);
				setLoading(false);
			})
			.catch(() => {
				console.log("Failed to fetch cards.");
				setLoading(false);
			});
	}, [decodedToken, handleLikeToggle_Cards, cards]);

	if (loading) {
		return <Loading />;
	}

	return (
		<main
			style={{
				backgroundColor: theme.background,
				color: theme.color,
			}}
		>
			<Button text={"Back"} />
			<div className='container py-5'>
				<h2>My favorite Business Cards</h2>
				<div className='row'>
					{cards.map((card: Cards) => {
						return (
							<div key={card._id} className='col-12 col-md-6 col-xl-4 my-3'>
								<div
									style={{
										backgroundColor: theme.background,
										color: theme.color,
									}}
									className='card w-100 h-100 border-0 shadow-lg rounded-lg overflow-hidden'
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
												objectFit: "cover",
												height: "300px",
												transition: "transform 0.3s ease",
											}}
											onMouseOver={(e) => {
												e.currentTarget.style.transform =
													"scale(1.1)";
											}}
											onMouseOut={(e) => {
												e.currentTarget.style.transform =
													"scale(1)";
											}}
										/>
									</Link>
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
												<button
													style={{
														backgroundColor: theme.background,
														color: theme.color,
													}}
													onClick={() =>
														handleLikeToggle_Cards(
															card._id as string,
															cards,
															decodedToken._id as string,
															setCards,
														)
													}
													className={`${
														card.likes?.includes(
															decodedToken._id,
														)
															? "text-danger"
															: "text-light"
													} fs-5 rounded-5`}
												>
													{heart}
													<sub
														className={`${
															card.likes?.includes(
																decodedToken?._id,
															)
																? "text-danger"
																: "text-light"
														} mx-1 fs-5`}
													>
														{card.likes?.length}
													</sub>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</main>
	);
};

export default FavCards;
