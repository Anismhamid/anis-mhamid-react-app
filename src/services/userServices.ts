import axios from "axios";

const config = {
	method: "get",
	maxBodyLength: Infinity,
	url: "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
	headers: {
		"x-auth-token":
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck",
	},
};
export function getAllUsers() {
	return axios(config);
}
