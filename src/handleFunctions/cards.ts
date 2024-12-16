import {Cards} from "../interfaces/Cards";
import {deleteCardById, updateLikeStatus} from "../services/cardsServices";

// handling cards deleting
export const handleDeleteCard = (id: string, cardsSetter: void) => {
	deleteCardById(id)
		.then(() => cardsSetter)
		.catch((err) => {
			console.log(err);
		});
};

// handling like/unlike
export const handleLikeToggle = (
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
				card.likes = card.likes.filter((id: string) => id !== (userId as string));
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


