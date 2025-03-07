import * as yup from "yup";

export const cardsFormikValues = {
	title: "",
	subtitle: "",
	description: "",
	phone: "",
	email: "",
	web: "",
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
		zip: "0",
	},
};

export const cardsFormikValuesSchema = yup.object({
	title: yup.string().min(2).max(256).required(),
	subtitle: yup.string().min(2).max(256).required(),
	description: yup.string().min(2).max(1024).required(),
	phone: yup
		.string()
		.min(9, "minimum phone number is 9")
		.max(11, "maximum phone number is 11")
		.required()
		.matches(
			/^(\(\d{3}\)\s?|\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}$/,
			"Invalid phone number format. Example: (123) 456-7890 or 123-456-7890",
		),
	email: yup.string().min(5).required(),
	web: yup.string().min(14),
	image: yup.object({
		url: yup.string().url().min(14).required(),
		alt: yup.string().min(2).max(256).required(),
	}),
	address: yup.object({
		state: yup.string(),
		country: yup.string().required(),
		city: yup.string().required(),
		street: yup.string().required(),
		houseNumber: yup.number().required(),
		zip: yup.number(),
	}),
});
