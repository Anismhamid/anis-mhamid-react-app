import {FunctionComponent} from "react";

interface UserInputProps {
	name: string;
	type: string;
	value: string | number | undefined;
	error: string | undefined;
	touched: boolean | undefined;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

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
	createdAt: new Date().getFullYear(),
	__v: 0,
};

const CardsInput: FunctionComponent<UserInputProps> = ({
	name,
	type,
	value,
	error = false,
	touched = false,
	onChange,
	onBlur,
	placeholder,
}) => {
	return (
		<div className='form-floating mb-3'>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				placeholder={placeholder}
				className={`form-control ${touched && error ? "is-invalid" : ""}`}
				onChange={onChange}
				onBlur={onBlur}
				aria-label={name}
			/>
			{touched && error && <div className='invalid-feedback'>{error}</div>}
			<label htmlFor={name} className='form-label fw-bold text-secondary'>
				{placeholder}
			</label>
		</div>
	);
};

export default CardsInput;
