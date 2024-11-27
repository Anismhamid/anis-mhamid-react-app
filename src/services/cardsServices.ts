import axios from "axios";
import {errorMSG} from "../assets/taosyify/Toastify";

let config = {
	method: "get",
	maxBodyLength: Infinity,
	url: "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
	headers: {},
};

export const getAllCards = async () => {
	try {
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		return errorMSG("Error while fetching the cards please try again.");
	}
};
