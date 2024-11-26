import {FunctionComponent} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {User} from "../interfaces/User";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
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
			img: {
				imageUrl: "",
				alt: "",
			},
			address: {
				state: "",
				country: "",
				city: "",
				street: "",
				houseNumber: 0,
				zipCode: 0,
			},
			isBusiness: false,
		},
		validationSchema: yup.object({
			name: yup.object({
				first: yup.string().required().min(2).max(256),
				middle: yup.string().min(2).max(256),
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
			img: yup.object({
				imageUrl: yup
					.string()
					.min(14, "Image URL must be at least 14 characters long")
					.url("Please provide a valid URL"),
				alt: yup
					.string()
					.min(2, "Image alt text must be at least 2 characters long"),
			}),
			address: yup.object({
				state: yup.string().min(2).max(256),
				country: yup.string().min(2).max(256).required("Country is required"),
				city: yup.string().min(2).max(256).required("City is required"),
				street: yup.string().min(2).max(256).required("Street is required"),
				houseNumber: yup.number().min(1).required("House number is required"),
				zipCode: yup.number().min(2).required("Zip code is required"),
			}),
			isBusiness: yup
				.boolean()
				.required("Please select whether this is a business account"),
		}),
		onSubmit: (values, {resetForm}) => {
			console.log("Form submitted with values:", {...values});
			// To check if Formik is actually calling this function
			alert("Form submitted");
			resetForm();
		},
	});
	return (
		<main className='container'>
			<h1 className='text-light my-5'>REGISTER</h1>
			<form onSubmit={formik.handleSubmit}>
				{/* First Name input */}
				<div className='row'>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='text'
								name='name.first'
								className='form-control'
								id='name.first'
								placeholder='Joe'
								value={formik.values.name.first}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.name?.first && formik.errors.name?.first && (
								<p className='text-danger'>{formik.errors.name.first}</p>
							)}
							<label htmlFor='name.first'>First Name</label>
						</div>
					</div>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='text'
								name='name.middle'
								className='form-control'
								id='name.middle'
								placeholder='Middle Name'
								value={formik.values.name.middle}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							<label htmlFor='name.middle'>Middle Name</label>
						</div>
					</div>
				</div>

				{/* Last Name and Phone */}
				<div className='row mt-3'>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='text'
								name='name.last'
								className='form-control'
								id='name.last'
								placeholder='Doe'
								value={formik.values.name.last}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.name?.last && formik.errors.name?.last && (
								<p className='text-danger'>{formik.errors.name.last}</p>
							)}
							<label htmlFor='name.last'>Last Name</label>
						</div>
					</div>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								autoComplete='off'
								type='tel'
								name='phone'
								className='form-control'
								id='phone'
								placeholder='Phone number'
								value={formik.values.phone}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.phone && formik.errors.phone && (
								<p className='text-danger'>{formik.errors.phone}</p>
							)}
							<label htmlFor='phone'>Phone Number</label>
						</div>
					</div>
				</div>

				{/* Email and Password */}
				<div className='row mt-3'>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								autoComplete='off'
								type='email'
								name='email'
								className='form-control'
								id='email'
								placeholder='Example@gmail.com'
								value={formik.values.email}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.email && formik.errors.email && (
								<p className='text-danger'>{formik.errors.email}</p>
							)}
							<label htmlFor='email'>Email</label>
						</div>
					</div>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='password'
								name='password'
								className='form-control'
								id='password'
								placeholder='Password'
								value={formik.values.password}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.password && formik.errors.password && (
								<p className='text-danger'>{formik.errors.password}</p>
							)}
							<label htmlFor='password'>Password</label>
						</div>
					</div>
				</div>

				{/* Image URL and Alt Text */}
				<div className='row mt-3'>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='text'
								name='img.imageUrl'
								className='form-control'
								id='img.imageUrl'
								placeholder='Image URL'
								value={formik.values.img?.imageUrl}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>

							<label htmlFor='img.imageUrl'>Image URL</label>
						</div>
					</div>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='text'
								name='img.alt'
								className='form-control'
								id='img.alt'
								placeholder='Image Alt Text'
								value={formik.values.img?.alt}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							<label htmlFor='img.alt'>Image Alt Text</label>
						</div>
					</div>
				</div>

				{/* Address fields */}
				<div className='row mt-3'>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='text'
								name='address.state'
								className='form-control'
								id='address.state'
								placeholder='State'
								value={formik.values.address.state}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							<label htmlFor='address.state'>State</label>
						</div>
					</div>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='text'
								name='address.country'
								className='form-control'
								id='address.country'
								placeholder='address.Country'
								value={formik.values.address.country}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.address?.country &&
								formik.errors.address?.country && (
									<p className='text-danger'>
										{formik.errors.address.country}
									</p>
								)}
							<label htmlFor='address.country'>Country</label>
						</div>
					</div>
				</div>

				{/* Continue Address (City, Street, House Number, Zip Code) */}
				<div className='row mt-3'>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='text'
								name='address.city'
								className='form-control'
								id='address.city'
								placeholder='address.City'
								value={formik.values.address.city}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.address?.city &&
								formik.errors.address?.city && (
									<p className='text-danger'>
										{formik.errors.address.city}
									</p>
								)}
							<label htmlFor='address.city'>City</label>
						</div>
					</div>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='text'
								name='address.street'
								className='form-control'
								id='address.street'
								placeholder='address.Street'
								value={formik.values.address.street}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.address?.street &&
								formik.errors.address?.street && (
									<p className='text-danger'>
										{formik.errors.address.street}
									</p>
								)}
							<label htmlFor='address.street'>Street</label>
						</div>
					</div>
				</div>

				<div className='row mt-3'>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='number'
								name='address.houseNumber'
								className='form-control'
								id='address.houseNumber'
								placeholder='House Number'
								value={formik.values.address.houseNumber}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.address?.houseNumber &&
								formik.errors.address?.houseNumber && (
									<p className='text-danger'>
										{formik.errors.address.houseNumber}
									</p>
								)}
							<label htmlFor='address.houseNumber'>House Number</label>
						</div>
					</div>
					<div className='col-6'>
						<div className='form-floating'>
							<input
								type='number'
								name='address.zipCode'
								className='form-control'
								id='address.zipCode'
								placeholder='Zip Code'
								value={formik.values.address.zipCode}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.touched.address?.zipCode &&
								formik.errors.address?.zipCode && (
									<p className='text-danger'>
										{formik.errors.address.zipCode}
									</p>
								)}
							<label htmlFor='address.zipCode'>Zip Code</label>
						</div>
					</div>
				</div>
				<div className='row'>
					{/* Business checkbox */}
					{/* <div className='form-check mt-3 w-50 border pt-1'>
						<input
							name='isBusiness'
							className='form-check-input'
							type='checkbox'
							id='isBusiness'
							checked={formik.values.isBusiness}
							onChange={formik.handleChange}
						/>
						<label
							className='form-check-label text-light fw-bold lead'
							htmlFor='isBusiness'
						>
							business account
						</label>
					</div>*/}
				</div>
				{/* Submit Button */}
				<button type='submit' className='mt-5 w-100'>
					REGISTER
				</button>
			</form>
		</main>
	);
};

export default Register;
