import axios from "axios";
import {User, UserLogin} from "../interfaces/User";
import {errorMSG, infoMSG} from "../atoms/taosyify/Toastify";
const api: string = `${import.meta.env.VITE_API_URL}/users`;

const token = {
	"x-auth-token":
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNjA4ZDFjN2NkODBjMWZkMjc1MzIiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzQ2NDEzNDh9.VxjyYRGzg3twgIaBeUhw-neIfMbfmDj9qSzUdEgiiZg",
};

const getUsers = {
	method: "get",
	maxBodyLength: Infinity,
	url: api,
	headers: token,
};

// Login function
export async function loginIn(login: UserLogin): Promise<any> {
	try {
		const response = await axios.post(`${api}/login`, login);
		return response;
	} catch (error) {
		console.log(error);
		throw new Error("Login failed, please try again.");
	}
}

// Fetch all users
export const getAllUsers = async (page: number, limit: number) => {
	try {
		const response = await axios.request({
			...getUsers,
			url: `${api}?page=${page}&limit=${limit}`,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		errorMSG("Filed to fetch data please try again later");
	}
};

// Get specific user by ID
export const getUserById = async (userId: string) => {
	try {
		const response = await axios.request({...getUsers, url: `${api}/${userId}`});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// Register a new user
export const registerNewUser = (user: User) => {
	const response = axios.request({
		...getUsers,
		headers: {"Content-Type": "application/json"},
		method: "post",
		data: user,
	});
	return response;
};

// Delete specific user by ID
export const deleteUserById = async (userId: string) => {
	try {
		const response = await axios.request({
			...getUsers,
			url: `${api}/${userId}`,
			method: "delete",
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const patchUserBusiness = async (
	cardId: string,
	data: {isBusiness: boolean},
	user: {isBusiness: boolean},
) => {
	if (!token) {
		throw new Error("Token not found.");
	}
	try {
		const response = await axios.patch(`${api}/${cardId}`, data, {
			headers: token,
		});
		infoMSG(
			`administration has been changed for ${response.data.email} to ${
				user.isBusiness ? "Client account" : "Business account"
			}`,
		);
		return response.data;
	} catch (error) {
		console.error("Failed to update user:", error);
		return null;
	}
};

// Put specific user by ID
export const putUserData = async (userId: string, data: User) => {
	try {
		const response = await axios.request({
			...getUsers,
			url: `${api}/${userId}`,
			method: "put",
			data: data,
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};
