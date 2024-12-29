import * as yup from "yup";

export const registeryFormikValues = {
	name: {
		first: "",
		middle: "",
		last: "",
	},
	phone: "",
	email: "",
	password: "",
	image: {
		url: "",
		alt: "",
	},
	address: {
		state: "",
		country: "",
		city: "",
		street: "",
		houseNumber: 0,
		zip: 0,
	},
	isBusiness: false,
};

export const registeryFormikShcema = yup.object({
	name: yup.object({
		first: yup.string().required("Name is required").min(2).max(256),
		middle: yup.string().min(2).max(256).optional(),
		last: yup.string().required().min(2).max(256),
	}),
	phone: yup
		.string()
		.required()
		.min(9)
		.max(10)
		.matches(
			/^(\(\d{3}\)\s?|\d{3}[-]?)\d{3}[-]?\d{4}$|^\d{10}$/,
			"Invalid phone number format. Example: (123) 456-7890 or 123-456-7890",
		),
	email: yup
		.string()
		.required("Email is required")
		.email("Invalid email format")
		.min(5, "Email must be at least 5 characters long")
		.matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
	password: yup
		.string()
		.required("Password is required")
		.min(7, "Password must be at least 7 characters long")
		.max(20, "Password must be at most 20 characters long")
		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/),
	image: yup.object({
		url: yup
			.string()
			.min(14, "Image URL must be at least 14 characters long")
			.url("Please provide a valid URL")
			.optional()
			.matches(/https?:\/\/[^\s]+/),
		alt: yup
			.string()
			.min(2, "Image alt text must be at least 2 characters long")
			.optional(),
	}),
	address: yup.object({
		state: yup.string().min(2).max(256).optional(),
		country: yup.string().min(2).max(256).required("Country is required"),
		city: yup.string().min(2).max(256).required("City is required"),
		street: yup.string().min(2).max(256).required("Street is required"),
		houseNumber: yup.number().min(1).required("House number is required"),
		zip: yup.number().min(2).required("Zip code is required"),
	}),
	isBusiness: yup.boolean(),
});
