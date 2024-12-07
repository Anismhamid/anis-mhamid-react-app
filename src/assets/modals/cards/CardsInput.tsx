import {FunctionComponent} from "react";

// props type for formik validation
type UserInputFormikPropsType = {
	name: string;
	type: string;
	value: string | number | undefined;
	error: string | undefined;
	touched: boolean | undefined;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
};

// initional values for adding a new card
export const newCardInitionalVal = {
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
	createdAt: 0,
	__v: 0,
};

const CardsInput: FunctionComponent<UserInputFormikPropsType> = (props) => {
	return (
		<div className='form-floating mb-3'>
			<input
				type={props.type}
				id={props.name}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				className={`form-control ${
					props.touched && props.error ? "is-invalid" : ""
				}`}
				onChange={props.onChange}
				onBlur={props.onBlur}
				aria-label={props.name}
			/>
			{props.touched && props.error && (
				<div className='invalid-feedback'>{props.error}</div>
			)}
			<label htmlFor={props.name} className='form-label fw-bold text-secondary'>
				{props.placeholder}
			</label>
		</div>
	);
};

export default CardsInput;
