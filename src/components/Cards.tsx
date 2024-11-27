import {FunctionComponent, useEffect, useState} from "react";
import {getAllCards} from "../services/cardsServices";
import {Cards} from "../interfaces/Cards";
import Loading from "../assets/loading/Loading";
import Like from "../assets/likeButton.tsx/Like";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [cards, setCards] = useState<Cards[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const haveToken: string | null = localStorage.getItem("token") || null;

	useEffect(() => {
		getAllCards().then((res) => {
			setCards(res);
			setLoading(false);
			console.log(res);
		});
	}, []);
	if (loading) {
		return <Loading />;
	}
	return (
		<div className='container'>
			<h1 className='text-start text-light mt-5'>Cards</h1>
			<hr className=' border-light' />
			<div className='row'>
				{cards.length ? (
					cards.map((card) => (
						<div
							key={card._id}
							className='card text-start col-sm-12 col-md-6 col-lg-4 mx-auto mt-5'
							style={{maxWidth: "26rem"}}
						>
							<img
								className='card-img-top'
								src={card.image.url}
								alt={card.image.alt}
							/>
							<div className='card-body text-start'>
								<h5 className='card-title'>{card.title}</h5>
								<h6 className='card-subtitle'>{card.subtitle}</h6>
								<hr />
								<h6 className='card-text'>
									phone:{" "}
									<span className='card-subtitle'>{card.phone}</span>
								</h6>
								<p className='card-text'>address: {card.address.city}</p>
							</div>
							{haveToken ? (
								<>
									<hr />
									<div className='likes-container d-flex mb-2'>
										<span className=' text-danger fw-bold'>
											<Like />
										</span>
										<span className=' text-danger fw-bold'>
											{card.likes.length}
										</span>
									</div>
								</>
							) : (
								<></>
							)}
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Home;
