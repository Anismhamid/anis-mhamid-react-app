import axios, {AxiosRequestConfig} from "axios";
import {Cards} from "../interfaces/Cards";
import {errorMSG} from "../atoms/taosyify/Toastify";

const api: string = import.meta.env.VITE_API_URL;

const getCards: AxiosRequestConfig = {
	method: "get",
	url: `${api}/cards`,
	headers: {
		Authorization: localStorage.getItem("bCards_token"),
	},
};

export const getAllCards = async () => {
	try {
		const response = await axios.request(getCards);
		return response.data;
	} catch (error) {
		errorMSG("Failed to load cards. Please try again laetr");
	}
};

export const getLikedCardById = async (userId: string) => {
	try {
		const response = await axios.request({
			...getCards,
			url: `${getCards.url}?likes=${userId}`,
		});
		return response.data;
	} catch (error) {
		errorMSG("Failed to fetch cards");
		return null;
	}
};

export const updateLikeStatus = async (cardId: string, userId: string): Promise<any> => {
	let token: string | null = localStorage.getItem("bCards_token");
	if (!token) return;

	const payload = {
		cardId,
		userId,
	};

	try {
		const updatedCard: Cards[] = await axios.request({
			method: "patch",
			url: `${getCards.url}/${payload.cardId}?likes=${userId}`,
			headers: {
				"x-auth-token": token,
			},
			data: payload,
		});
		return updatedCard;
	} catch (error) {
		errorMSG("Failed to update like status. Please try again later");
		return null;
	}
};

export const getMyCards = async () => {
	try {
		const response = await axios.get(`${getCards.url}/my-cards`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("bCards_token"),
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const createNewCard = async (card: Cards) => {
	try {
		let response = await axios.post(`${api}/cards`, card, {
			headers: {
				Authorization: localStorage.getItem("bCards_token"),
			},
		});
		return response.data;
	} catch (error) {
		errorMSG(error as string);
	}
};

export const putCard = async (cardId: string, newCard: Cards) => {
	try {
		const token = localStorage.getItem("bCards_token");

		if (!token)
			errorMSG("Error while making authentication please try againg later.");

		const response = await axios.put(`${getCards.url}/${cardId}`, newCard, {
			headers: {
				Authorization: token,
			},
		});
		return response.data;
	} catch (error) {
		errorMSG("Failed to update card. Please try again later.");
	}
};

export const getCardById = async (cardId: string) => {
	try {
		// let token: string | null = localStorage.getItem("bCards_token");
		// if (!token)
		// errorMSG("Failed to fetch card. Authentication error. Please log in.");
		const response = await axios.get(`${getCards.url}/${cardId}`);
		return response.data;
	} catch (error) {
		errorMSG("Failed to fetch card. Please try again later.");
	}
};

export const deleteCardById = async (cardId: string) => {
	const token: string | null = localStorage.getItem("bCards_token");
	if (!token) {
		errorMSG("Authentication required. Please log in.");
	}
	try {
		const response = await axios.delete(`${getCards.url}/${cardId}`, {
			headers: {
				"x-auth-token": token,
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			errorMSG(
				`Internet connection error: ${error.response?.data || error.message}`,
			);
		} else {
			errorMSG(`Unexpected error: ${error}`);
			return null;
		}
	}
};
