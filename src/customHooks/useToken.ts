import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

interface DecodedToken {
	exp: number;
	iat: number; 
	[key: string]: any;
}

function useToken() {
	const token = localStorage.getItem("token");
	const [afterDecode, setAfterDecode] = useState<any>({});

	useEffect(() => {
		const checkToken = () => {
			if (token) {
				try {
					const decoded: DecodedToken = jwtDecode(token);
					const currentTime = Date.now() / 1000;

					if (decoded.exp < currentTime) {
						console.log("Token has expired");
						localStorage.removeItem("token");
						setAfterDecode(null);
					} else {
						setAfterDecode(decoded);
					}
				} catch (error) {
					console.log("Invalid token:", error);
					localStorage.removeItem("token");
					setAfterDecode(null);
				}
			} else {
				setAfterDecode(null);
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




	return {afterDecode};
}

export default useToken;
