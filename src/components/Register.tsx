import {ChangeEvent, FocusEvent, FunctionComponent} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {User} from "../interfaces/User";
import {useNavigate} from "react-router-dom";
import {pathes} from "../routes/Routes";
import {registerNewUser} from "../services/userServices";
import {successMSG} from "../assets/taosyify/Toastify";
import CardsInput from "../assets/modals/cards/CardsInput";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	const navigate = useNavigate();

	const formik = useFormik<User>({
		initialValues: {
			name: {
				first: "",
				middle: "",
				last: "",
			},
			phone: "",
			email: "",
			password: "",
			image: {
				imageUrl: "",
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
		},
		validationSchema: yup.object({
			name: yup.object({
				first: yup.string().required().min(2).max(256),
				middle: yup.string().min(2).max(256).optional(),
				last: yup.string().required().min(2).max(256),
			}),
			phone: yup
				.string()
				.required("Phone number is required")
				.min(9)
				.max(11)
				.matches(
					/^(\(\d{3}\)\s?|\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}$/,
					"Invalid phone number format. Example: (123) 456-7890 or 123-456-7890",
				),
			email: yup
				.string()
				.required("Email is required")
				.email("Invalid email format")
				.min(5, "Email must be at least 5 characters long"),
			password: yup
				.string()
				.required("Password is required")
				.min(7, "Password must be at least 7 characters long")
				.max(20, "Password must be at most 20 characters long"),
			image: yup.object({
				imageUrl: yup
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
			isBusiness: yup.boolean(),
		}),
		onSubmit: (values) => {
			registerNewUser(values)
				.then((res) => {
					// const jwt = require("jsonwebtoken");
					// const payload = {res};
					// const secretKey = "new Date().getTime()";
					// const token = jwt.sign(payload, secretKey);

					// console.log("JWT Token:", token);
					document.cookie = `token=${res}; path=/; secure; HttpOnly; SameSite=Strict`;
					successMSG("Form submitted");
					navigate(pathes.cards);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	});

	return (
		<main className='container my-5'>
			<h1 className='text-center text-light mb-5'>REGISTER</h1>

			<form
				onSubmit={formik.handleSubmit}
				className='shadow-lg p-4 rounded-3 bg-white'
			>
				{/* First and Middle Name */}
				<div className='row mb-3'>
					<div className='col-md-6 col-sm-12'>
						<CardsInput
							name={"name.first"}
							type={"text"}
							value={formik.values.name.first}
							error={formik.errors.name?.first}
							touched={formik.touched.name?.first}
							placeholder={"First name"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>

					<div className='col-md-6 col-sm-12'>
						<CardsInput
							name={"name.middle"}
							type={"text"}
							value={formik.values.name.middle}
							error={formik.errors.name?.middle}
							touched={formik.touched.name?.middle}
							placeholder={"Middle Name"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>
				{/* Last Name and Phone */}
				<div className='row mb-3'>
					<div className='col-md-6 col-sm-12'>
						<CardsInput
							name={"name.last"}
							type={"text"}
							value={formik.values.name.last}
							error={formik.errors.name?.last}
							touched={formik.touched.name?.last}
							placeholder={"Last name"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>

					<div className='col-md-6 col-sm-12'>
						<CardsInput
							name={"phone"}
							type={"tel"}
							value={formik.values.phone}
							error={formik.errors.phone}
							touched={formik.touched.phone}
							placeholder={"Phone"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>
				{/* Email and Password */}
				<div className='row mb-3'>
					<div className='col-md-6 col-sm-12'>
						<CardsInput
							name={"email"}
							type={"email"}
							value={formik.values.email}
							error={formik.errors.email}
							touched={formik.touched.email}
							placeholder={"Email"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>

					<div className='col-md-6 col-sm-12'>
						<CardsInput
							name={"password"}
							type={"password"}
							value={formik.values.password}
							error={formik.errors.password}
							touched={formik.touched.password}
							placeholder={"Password"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Image URL and Alt Text */}
				<div className='row mb-3'>
					<div className='col-md-6 col-sm-12'>
						<div className='form-floating mb-3'>
							<input
								type={"text"}
								id={"image"}
								name={"image"}
								accept='image/*'
								value={formik.values.image?.imageUrl}
								placeholder={"Image URL"}
								className={`form-control`}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								aria-label={"imageUrl"}
							/>
							<label
								htmlFor={"image"}
								className='form-label fw-bold text-secondary'
							>
								{"Image Url"}
							</label>
						</div>
					</div>

					<div className='col-md-6 col-sm-12'>
						<div className='form-floating mb-3'>
							<input
								type={"text"}
								id={"image.alt"}
								name={"image.alt"}
								value={formik.values.image?.alt}
								placeholder={"Image URL"}
								className={`form-control`}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								aria-label={"imageAlt"}
							/>
							<label
								htmlFor={"image.alt"}
								className='form-label fw-bold text-secondary'
							>
								{"Image Alt text"}
							</label>
						</div>
					</div>
				</div>

				{/* Address fields */}
				<div className='row mb-3'>
					<div className='col-md-6 col-sm-12'>
						<CardsInput
							name={"address.state"}
							type={"text"}
							value={formik.values.address.state}
							error={formik.errors.address?.state}
							touched={formik.touched.address?.state}
							placeholder={"State"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>

					<div className='col-md-6 col-sm-12'>
						<CardsInput
							name={"address.country"}
							type={"text"}
							value={formik.values.address.country}
							error={formik.errors.address?.country}
							touched={formik.touched.address?.country}
							placeholder={"Country"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>
				<div className='row mt-3'>
					<div className='col-md-6 col-sm-12 mt-2'>
						<CardsInput
							name={"address.city"}
							type={"text"}
							value={formik.values.address.city}
							error={formik.errors.address?.city}
							touched={formik.touched.address?.city}
							placeholder={"City"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-md-6 col-sm-12 mt-2'>
						<CardsInput
							name={"address.street"}
							type={"text"}
							value={formik.values.address.street}
							error={formik.errors.address?.street}
							touched={formik.touched.address?.street}
							placeholder={"Street"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>
				{/* House number and Zip */}
				<div className='row mt-3'>
					<div className='col-md-6 col-sm-12 mt-2'>
						<CardsInput
							name={"address.houseNumber"}
							type={"number"}
							value={formik.values.address.houseNumber}
							error={formik.errors.address?.houseNumber}
							touched={formik.touched.address?.houseNumber}
							placeholder={"House number"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-md-6 col-sm-12 mt-2'>
						<CardsInput
							name={"address.zip"}
							type={"number"}
							value={formik.values.address.zip}
							error={formik.errors.address?.zip}
							touched={formik.touched.address?.zip}
							placeholder={"Zip code"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>
				{/* Business Account Checkbox */}
				<div className='text-start my-3  w-50'>
					<hr />
					<input
						type='checkbox'
						name='isBusiness'
						className='form-check-input'
						id='isBusiness'
						checked={formik.values.isBusiness ? true : false}
						onChange={formik.handleChange}
					/>
					<label className='form-check-label fw-bold mx-2' htmlFor='isBusiness'>
						Business Account
					</label>
				</div>
				{/* Submit Button */}
				<button
					type='submit'
					className='btn btn-primary w-100 py-2 mt-3'
					// disabled={!formik.dirty || !formik.isValid}
				>
					REGISTER
				</button>
			</form>
		</main>
	);
};

export default Register;
