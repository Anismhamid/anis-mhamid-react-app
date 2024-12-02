import axios, {AxiosRequestConfig} from "axios";
import {Cards} from "../interfaces/Cards";

const api: string = import.meta.env.VITE_API_URL as string;

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

export const getCardById = async (userId: string): Promise<any> => {
	try {
		const response = await axios({
			...getCards,
			url: `${api}/cards?user_id=${userId}`,
		});
		return response.data;
	} catch (error) {
		console.log("Error fetching cards:", error);
		throw new Error("Failed to fetch cards");
	}
};

export const updateLikeStatus = async (cardId: string, userId: string): Promise<any> => {
	try {
		const response = await axios.post(`/${api}/cards/${cardId}/likes`, {userId});

		return response.data;
	} catch (error) {
		console.error("Failed to update like status:", error);
		throw error;
	}
};

export const toggleLikeCard = async (cardId: string) => {
	try {
		const response = await fetch(`/api/cards/${cardId}/toggle-like`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const updatedCard = await response.json();
		return updatedCard; // Return the updated card with the new likes array
	} catch (error) {
		throw new Error("Failed to toggle like");
	}
};


export const getMyCards = async (token: string) => {
	const response = await axios.request({
		...getCards,
		headers: {
			"x-auth-token": token,
		},
	});
	return response.data
};
