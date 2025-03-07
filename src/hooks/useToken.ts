import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

interface DecodedToken {
	exp: number;
	iat: number;
	[key: string]: any;
}

function useToken() {
	const token = localStorage.getItem("bCards_token");
	const [decodedToken, setAfterDecode] = useState<any>({});

	useEffect(() => {
		const checkToken = () => {
			if (token) {
				try {
					const decoded: DecodedToken = jwtDecode(token);
					const currentTime = Date.now() / 5000;

					if (decoded.exp < currentTime) {
						localStorage.removeItem("bCards_token");
						setAfterDecode(null);
					} else {
						setAfterDecode(decoded);
					}
				} catch (error) {
					console.log("Invalid token:", error);
					localStorage.removeItem("bCards_token");
					setAfterDecode(null);
				}
			}
		};

		checkToken();

		const handleStorageChange = () => {
			checkToken();
		};

		window.addEventListener("storage", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [token]);

	return {decodedToken};
}

export default useToken;
