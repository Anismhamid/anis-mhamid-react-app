import {useFormik} from "formik";
import {FunctionComponent} from "react";
import * as yup from "yup";
interface AddNewCardFormProps {}

const AddNewCardForm: FunctionComponent<AddNewCardFormProps> = () => {
	const initionalVal = {
		_id: "",
		title: "",
		subtitle: "",
		description: "",
		phone: "",
		email: "",
		web: "",
		image: {
			url: "",
			alt: "",
			_id: "",
		},
		address: {
			state: "",
			country: "",
			city: "",
			street: "",
			houseNumber: 0,
			zip: 0,
			_id: "",
		},
		bizNumber: 0,
		likes: [],
		user_id: "",
		createdAt: "",
		__v: 0,
	};
	const formik = useFormik({
		initialValues: initionalVal,
		validationSchema: yup.object({
			title: yup.string().min(2).max(256).required(),
			subtitle: yup.string().min(2).max(256).required(),
			description: yup.string().min(2).max(1024).required(),
			phone: yup.string().min(9).max(11,'maximum phone number is 11').required(),
			email: yup.string().min(5).required(),
			web: yup.string(),
			image: yup.object({
				url: yup.string(),
				alt: yup.string(),
			}),
			address: yup.object({
				state: yup.string(),
				country: yup.string(),
				city: yup.string(),
				street: yup.string(),
				houseNumber: yup.number(),
				zip: yup.number(),
			}),
			bizNumber: yup.number(),
			likes: yup.array(),
			user_id: yup.string(),
			createdAt: yup.string(),
			__v: yup.number(),
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});
	return (
		<>
			<h1>Add New Card Form</h1>
		</>
	);
};

export default AddNewCardForm;
