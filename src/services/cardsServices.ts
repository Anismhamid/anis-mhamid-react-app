import axios, {AxiosRequestConfig} from "axios";
import {Cards} from "../interfaces/Cards";

const api: string = import.meta.env.VITE_API_URL;

let getCards: AxiosRequestConfig = {
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

export const getLikedCardById = async (userId: string): Promise<any> => {
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
	let token = localStorage.getItem("token");
	if (!token) {
		throw new Error("No token found, please log in again");
	}

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

		// Return the updated card data from the response
		return updatedCard;
	} catch (error) {
		console.error("Failed to update like status:", error);
		throw error;
	}
};

export const getMyCards = async (userId: string) => {
	let token = localStorage.getItem("token");
	if (!token) {
		throw new Error("User not authenticated");
	}

	const response = await axios.request({
		...getCards,
		headers: {"x-auth-token": token},
		url: `${api}/cards/my-cards?user_id=${userId}`,
	});

	return response.data;
};

export const createNewCard = async (card: Cards) => {
	let token = localStorage.getItem("token");
	let response: Cards = await axios.request({
		...getCards,
		method: "post",
		headers: {"x-auth-token": token},
		data: card,
	});
	return response;
};
