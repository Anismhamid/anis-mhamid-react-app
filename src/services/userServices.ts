import axios from "axios";
import {User, UserLogin} from "../interfaces/User";
import {infoMSG} from "../atoms/taosyify/Toastify";
const api: string = `${import.meta.env.VITE_API_URL}/users`;

const token = {
	"x-auth-token":
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck",
};

const getUsers = {
	method: "get",
	maxBodyLength: Infinity,
	url: api,
	headers: token,
};

// Login function
export async function loginIn(login: UserLogin): Promise<any> {
	const response = await axios.post(`${api}/login`, login);
	return response;
}

// Fetch all users
export async function getAllUsers() {
	try {
		const response = await axios.request({
			...getUsers
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

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
	let token = localStorage.getItem("token");
	try {
		const response = await axios.patch(`${api}/${cardId}`, data, {
			headers: {"x-auth-token": token},
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
