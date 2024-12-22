import axios, {AxiosRequestConfig} from "axios";
import {Cards} from "../interfaces/Cards";
import {errorMSG} from "../atoms/taosyify/Toastify";

const api: string = import.meta.env.VITE_API_URL;

const getCards: AxiosRequestConfig = {
	method: "get",
	maxBodyLength: Infinity,
	url: `${api}/cards`,
	headers: {},
};

export const getAllCards = async () => {
	try {
		const response = await axios.request(getCards);
		return response.data;
	} catch (error) {
		errorMSG("Failed to load cards. Please try again laetr");
		return null;
	}
};

export const getLikedCardById = async (userId: string) => {
	try {
		const response = await axios.request({
			...getCards,
			url: `${api}/cards?likes=${userId}`,
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
			url: `${api}/cards/${payload.cardId}?likes=${userId}`,
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

export const getMyCards = async (userId: string) => {
	let token: string | null = localStorage.getItem("bCards_token");
	if (!token) return;
	try {
		const response = await axios.request({
			...getCards,
			headers: {"x-auth-token": token},
			url: `${api}/cards/my-cards?user_id=${userId}`,
		});

		return response.data;
	} catch (error) {
		errorMSG("Failed to fetch your cards. Please try again later.");
		return null;
	}
};

export const createNewCard = async (card: Cards) => {
	let token: string | null = localStorage.getItem("bCards_token");
	if (!token) return;
	try {
		let response: Cards = await axios.request({
			...getCards,
			method: "post",
			headers: {"x-auth-token": token},
			data: card,
		});
		return response;
	} catch (error) {
		errorMSG("Authentication Error");
		return null;
	}
};

export const putCard = async (cardId: string, newCard: Cards) => {
	const token = localStorage.bCards_token;

	if (!token) {
		errorMSG("Error while making authentication please try againg later.");
		return null;
	}

	try {
		const response = await axios.put(`${api}/cards/${cardId}`, newCard, {
			headers: {"x-auth-token": token},
		});

		return response.data;
	} catch (error) {
		errorMSG("Failed to update card. Please try again later.");
		return null;
	}
};

export const getCardById = async (cardId: string) => {
	let token: string | null = localStorage.getItem("bCards_token");
	if (!token) return;
	try {
		const response = await axios.get(`${api}/cards/${cardId}`, {
			headers: {},
		});
		return response.data;
	} catch (error) {
		errorMSG("Failed to fetch card. Please try again later.");
		return null;
	}
};

export const deleteCardById = async (cardId: string) => {
	const token: string | null = localStorage.getItem("bCards_token");
	if (!token) {
		errorMSG("Authentication required. Please log in.");
	}
	try {
		const response = await axios.delete(`${api}/cards/${cardId}`, {
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
