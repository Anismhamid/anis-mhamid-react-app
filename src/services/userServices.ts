import axios from "axios";
import {User, UserLogin} from "../interfaces/User";
const api: string = `${import.meta.env.VITE_API_URL}/users`;

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck";

const getUsers = {
	method: "get",
	maxBodyLength: Infinity,
	url: api,
	headers: {
		"x-auth-token": token,
	},
};

// Login function
export async function loginIn(login: UserLogin): Promise<any> {
	const response = await axios.post(`${api}/login`, login);
	return response;
}

// Fetch all users
export async function getAllUsers(): Promise<any> {
	try {
		const response = await axios(getUsers);
		return response.data;
	} catch (error) {
		console.error("Error fetching all users:", error);
		throw error;
	}
}

// Get specific user by ID
export const getUserById = async (userId: User) => {
	const response = await axios.request({...getUsers, url: `${api}/${userId._id}`});
	return response.data;
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
