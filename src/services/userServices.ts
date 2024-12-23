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
		errorMSG("Login failed, please try again.");
		return null;
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
		errorMSG("Filed to fetch data please try again later");
		return null;
	}
};

// Get specific user by ID
export const getUserById = async (userId: string) => {
	try {
		const response = await axios.request({...getUsers, url: `${api}/${userId}`});
		return response.data;
	} catch (error) {
		errorMSG("Unexpected error please try again");
		return null;
	}
};

// Register a new user
export const registerNewUser = async (user: User): Promise<any | null> => {
	try {
		const response = await axios.request({
			...getUsers,
			headers: {"Content-Type": "application/json"},
			method: "post",
			data: user,
		});
		return response.data;
	} catch (error) {
		errorMSG("Failed to register user. Please try again later.");
		return null;
	}
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
		errorMSG("Failed to delete user. Please try again later.");
		return null;
	}
};

export const patchUserBusiness = async (
	cardId: string,
	data: {isBusiness: boolean},
	user: {isBusiness: boolean},
) => {
	if (!token) {
		errorMSG("Token not found.");
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
		errorMSG("Failed to update user. Please try again later.");
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
		errorMSG("Failed to update user data. Please try again later.");
		return null;
	}
};
