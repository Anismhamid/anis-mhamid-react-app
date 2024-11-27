export interface User {
	_id: string;
	name: {
		first: string;
		middle?: string;
		last: string;
	};
	phone: string;
	email: string;
	password: string;
	img?: {
		imageUrl: string;
		alt: string;
	};
	address: {
		state?: string;
		country: string;
		city: string;
		street: string;
		houseNumber: number;
		zipCode: number;
	};
	isBusiness: boolean;
}
