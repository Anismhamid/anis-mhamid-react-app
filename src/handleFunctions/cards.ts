import {Cards} from "../interfaces/Cards";
import {User} from "../interfaces/User";
import {deleteCardById, updateLikeStatus} from "../services/cardsServices";


// delete Card | Cards/CardDetails components
export const handleDeleteCard_Cards = (id: string, cardsSetter: void) => {
	deleteCardById(id)
		.then(() => cardsSetter)
		.catch((err) => {
			console.log(err);
		});
};

//Cards component handling like/unlike
export const handleLikeToggle_Cards = (
	cardId: string,
	cards: Cards[],
	userId: string,
	cardsSetter: Function,
) => {
	const updatedCards = cards.map((card: any) => {
		if (card._id === cardId) {
			const isLiked = card.likes.includes(userId);

			if (isLiked) {
				// Remove like
				card.likes = card.likes.filter((id: string) => id !== userId);
			} else {
				// Add like
				card.likes.push(userId);
			}

			// Update like status on the server
			updateLikeStatus(cardId, userId as string).catch((err) => {
				console.log("Failed to update like status:", err);
			});
		}
		return card;
	});
	cardsSetter(updatedCards);
};

// Card component handleSearch
	export const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
	};

//MyCards component handling like/unlike
export const handleLikeToggle_MyCards = (
	cardId: string,
	user: User,
	cards: Cards[],
	cardsSetter: Function,
) => {
	if (!user || !user._id) return;

	const updatedCards = cards.map((card: any) => {
		if (card._id === cardId) {
			const isLiked = card.likes.includes(user._id);
			const updatedLikes = isLiked
				? card.likes.filter((id: string) => id !== user._id)
				: [...card.likes, user._id];

			return {...card, likes: updatedLikes};
		}
		return card;
	});
	cardsSetter(updatedCards);
	updateLikeStatus(cardId, user._id).catch((err) => {
		console.log("Failed to update like status:", err);
	});
};


