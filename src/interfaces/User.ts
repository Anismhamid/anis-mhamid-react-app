export interface User {
	_id?: string;
	name: {
		first: string;
		middle?: string;
		last: string;
	};
	phone: string;
	email: string;
	password: string;
	image?: {
		url: string;
		alt?: string;
	};
	address: Address;
	isBusiness?: boolean;
	isAdmin?: boolean;
}

interface Address {
	state?: string;
	country: string;
	city: string;
	street: string;
	houseNumber: number;
	zip: number;
}

export interface UserLogin {
	email: string;
	password: string;
}
