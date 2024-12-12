import {createContext, useContext, useState, ReactNode, FunctionComponent} from "react";
import {User} from "../interfaces/User";

interface UserContextType {
	auth: User | null;
	setAuth: React.Dispatch<React.SetStateAction<User | null>>;
	isLogedIn: boolean;
	setIsLogedIn: React.Dispatch<React.SetStateAction<boolean>>;
	isAdmin: boolean;
	setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
	isBusiness: boolean;
	setIsBusiness: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: FunctionComponent<UserProviderProps> = ({children}) => {
	const [auth, setAuth] = useState<User | null>(null);
	const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [isBusiness, setIsBusiness] = useState<boolean>(false);

	return (
		<UserContext.Provider
			value={{
				auth,
				setAuth,
				isLogedIn,
				setIsLogedIn,
				isAdmin,
				setIsAdmin,
				isBusiness,
				setIsBusiness,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
