import axios, {AxiosRequestConfig} from "axios";
import {Cards} from "../interfaces/Cards";

const api: string = import.meta.env.VITE_API_URL;

const getCards: AxiosRequestConfig = {
	method: "get",
	maxBodyLength: Infinity,
	url: `${api}/cards`,
	headers: {},
};

export const getAllCards = async (): Promise<Cards[]> => {
	try {
		const response = await axios.request(getCards);
		return response.data;
	} catch (error) {
		console.error("Error fetching all cards:", error);
		throw new Error("Failed to fetch all cards");
	}
};

export const getLikedCardById = async (userId: string): Promise<Cards[]> => {
	try {
		const response = await axios.request({
			...getCards,
			url: `${api}/cards?likes=${userId}`,
		});
		return response.data;
	} catch (error) {
		console.log("Error fetching cards:", error);
		throw new Error("Failed to fetch cards");
	}
};

export const updateLikeStatus = async (cardId: string, userId: string): Promise<any> => {
	let token: string | null = localStorage.getItem("token");
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
		console.error("Failed to update like status:", error);
		throw new Error();
	}
};

export const getMyCards = async (userId: string) => {
	let token: string | null = localStorage.getItem("token");
	if (!token) return;
	try {
		const response = await axios.request({
			...getCards,
			headers: {"x-auth-token": token},
			url: `${api}/cards/my-cards?user_id=${userId}`,
		});

		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};

export const createNewCard = async (card: Cards) => {
	let token: string | null = localStorage.getItem("token");
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
		console.log(error);
		throw new Error();
	}
};

export const putCard = async (cardId: string, newCard: Cards) => {
	let token: string | null = localStorage.getItem("token");
	if (!token) return;
	try {
		const response = await axios.request({
			...getCards,
			url: `${api}/${cardId}`,
			headers: {"x-auth-token": token},
			data: newCard,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};

export const getCardById = async (cardId: string) => {
	let token: string | null = localStorage.getItem("token");
	if (!token) return;
	try {
		const response = await axios.request({
			...getCards,
			url: `${api}/${cardId}`,
			headers: {},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};

export const deleteCardById = async (cardId: string) => {
	let token: string | null = localStorage.getItem("token");

	if (!token) {
		console.error("Token is missing or invalid.");
		return;
	}

	const data = {
		bizNumber: 6943518,
	};

	try {
		const response = await axios.request({
			method: "delete",
			url: `${api}/${cardId}`,
			headers: {
				"x-auth-token": token,
				"Content-Type": "application/json",
			},
			data: data,
		});

		return response.data;
	} catch (error) {
		console.error("Request failed:", error);
		console.log(cardId);
	}
};
