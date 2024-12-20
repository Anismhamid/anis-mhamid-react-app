import * as yup from "yup";

export const updateUserFormikSchema = yup.object({
	name: yup.object({
		first: yup.string().required().min(2).max(256),
		middle: yup.string().min(2).max(256).optional(),
		last: yup.string().required().min(2).max(256),
	}),
	phone: yup
		.string()
		.required("Phone number is required  (123) 456-7890 or 123-456-7890")
		.min(9)
		.max(11)
		.matches(
			/^(\(\d{3}\)\s?|\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}$/,
			"Invalid phone number format. Example: (123) 456-7890 or 123-456-7890",
		),
	image: yup.object({
		url: yup
			.string()
			.min(14, "Image URL must be at least 14 characters long")
			.url("Please provide a valid URL")
			.optional(),
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
});
