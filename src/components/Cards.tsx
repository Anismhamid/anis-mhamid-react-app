import {FunctionComponent, useEffect, useState} from "react";
import {getAllCards} from "../services/cardsServices";
import {Cards} from "../interfaces/Cards";
import Loading from "../assets/loading/Loading";
import {useUserContext} from "../context/UserContext";
import useToken from "../customHooks/useToken";
import Like from "../assets/likeButton.tsx/Like";
import {errorMSG} from "../assets/taosyify/Toastify";
import AddNewCardModal from "../assets/modals/cards/AddNewCardModal";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [cards, setCards] = useState<Cards[]>([]);
	const {afterDecode} = useToken();
	const {isAdmin, isLogedIn} = useUserContext();
	const [loading, setLoading] = useState<boolean>(true);
	const [showAddModal, setShowAddModal] = useState(false);

	const onHide = () => setShowAddModal(false);
	const onShow = () => setShowAddModal(true);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const res = await getAllCards();
				if (res) {
					setCards(res);
				} else {
					errorMSG("No cards data returned.");
				}
			} catch (err) {
				console.log("Error fetching cards:", err);
				errorMSG("Error fetching cards.");
			} finally {
				setLoading(false);
			}
		};

		fetchCards();
	}, [isLogedIn, afterDecode, isAdmin]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='container'>
			<h1 className='text-center text-light mt-5'>Cards</h1>
			<hr className='border-light' />
			<div className=''>
				<button onClick={() => onShow()}>Add Card</button>
			</div>
			<div className='row'>
				{cards.length > 0 ? (
					cards.map((card) => (
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
										e.currentTarget.style.transform = "scale(1.1)";
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

									{isLogedIn && (
										<div>
											<hr />
											<div className='d-flex justify-content-between align-items-center'>
												<div className='likes-container d-flex align-items-center'>
													<button className='btn text-danger fw-bold'>
														<Like />
													</button>
													<span className='text-danger fw-bold mx-2 lead'>
														{card.likes.length}
													</span>
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
					))
				) : (
					<p className='text-center text-light'>No cards available</p>
				)}
			</div>
			<AddNewCardModal show={showAddModal} onHide={onHide} />
		</div>
	);
};

export default Home;
