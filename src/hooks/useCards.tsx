import {useEffect, useState} from "react";
import {getAllCards} from "../services/cardsServices";
import {Cards} from "../interfaces/Cards";

const useCards = () => {
	const [allCards, setCards] = useState<Cards[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		try {
			getAllCards()
				.then((res: Cards[] | null) => {
					if (res) {
						setCards(res.reverse());
						setError(null);
					} else {
						setCards([]);
						setError("No cards available.");
					}
				})
				.catch((err) => {
					console.error("Error loading cards:", err);
					const errorMessage =
						err?.response?.data?.message ||
						"Failed to load cards. Please try again later.";
					setError(errorMessage);
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return {allCards, setCards, error};
};

export default useCards;
