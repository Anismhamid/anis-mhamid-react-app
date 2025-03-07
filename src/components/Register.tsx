import {FunctionComponent, useContext, useEffect, useState} from "react";
import {FormikValues, useFormik} from "formik";
import {User} from "../interfaces/User";
import {Link, useNavigate} from "react-router-dom";
import {pathes} from "../routes/Routes";
import {registerNewUser} from "../services/userServices";
import {errorMSG, successMSG} from "../atoms/taosyify/Toastify";
import CardsInput from "../atoms/modals/CardsInput";
import {SiteTheme} from "../theme/theme";
import {
	registeryFormikShcema,
	registeryFormikValues,
} from "../fomikFormsValidation/registeryFormik";
import Button from "../atoms/buttons/Button";
import Loading from "./Loading";
import {useUserContext} from "../context/UserContext";
import useToken from "../hooks/useToken";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	const navigate = useNavigate();
	const theme = useContext(SiteTheme);
	const [loading, setLoading] = useState(false);
	const {setIsLogedIn} = useUserContext();
	const {decodedToken} = useToken();

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("bCards_token")as string);
		setIsLogedIn(!!token);
	}, [decodedToken]);

	const registeryFormik: FormikValues = useFormik<User>({
		initialValues: registeryFormikValues,
		validationSchema: registeryFormikShcema,

		onSubmit: (values: User) => {
			setLoading(true);
			try {
				registerNewUser(values)
					.then(() => {
						navigate(pathes.login);
						setLoading(false);
						successMSG(`Please Login to get in Bcards`);
					})
					.catch((err) => {
						errorMSG(`Registration failed: ${err.message || err}`);
					});
			} catch (error) {
				errorMSG(`This user already have registered`);
			}
		},
	});

	if (loading) return <Loading />;

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<Button text={"Back"} path={() => navigate(-1)} />
			<div className='container justify-content-center pt-5'>
				<p className='text-center fs-6 my-3 fw-bold'>Download the app</p>
				<hr className=' w-50 m-auto mb-2' />
				<div className='row reg2 m-auto'>
					<div className='col-6'>
						<Link
							rel='noopener noreferrer'
							target='_Blank'
							to='https://play.google.com/store'
							aria-label='Download from Google Play'
						>
							<img
								className='w-100 m-auto h-100'
								src='/images/googlrPlay.png'
								alt='Google Play Store'
							/>
						</Link>
					</div>
					<div className='col-6 '>
						<Link
							rel='noopener noreferrer'
							target='_Blank'
							to='https://www.apple.com/app-store/'
							aria-label='Download from Apple Store'
						>
							<img
								className='w-100 m-auto h-100'
								src='/images/Apple.png'
								alt='Apple Store'
							/>
						</Link>
					</div>
				</div>
				<div className='one'>
					<hr className='w-75 m-auto automatic-border m-5' />
				</div>
				<h1 className='text-center py-1 '>REGISTER</h1>
				<form
					onSubmit={registeryFormik.handleSubmit}
					className='shadow p-4 rounded-4 py-5 border'
				>
					{/* First and Middle Name */}
					<div className='row'>
						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"name.first"}
								type={"text"}
								value={registeryFormik.values.name.first}
								error={registeryFormik.errors.name?.first}
								touched={registeryFormik.touched.name?.first}
								placeholder={"First name"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>

						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"name.middle"}
								type={"text"}
								value={registeryFormik.values.name.middle}
								error={registeryFormik.errors.name?.middle}
								touched={registeryFormik.touched.name?.middle}
								placeholder={"Middle Name (optional)"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>
					</div>
					{/* Last Name and Phone */}
					<div className='row'>
						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"name.last"}
								type={"text"}
								value={registeryFormik.values.name.last}
								error={registeryFormik.errors.name?.last}
								touched={registeryFormik.touched.name?.last}
								placeholder={"Last name"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>

						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"phone"}
								type={"tel"}
								value={registeryFormik.values.phone}
								error={registeryFormik.errors.phone}
								touched={registeryFormik.touched.phone}
								placeholder={"Phone"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>
					</div>
					{/* Email and Password */}
					<div className='row'>
						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"email"}
								type={"email"}
								value={registeryFormik.values.email}
								error={registeryFormik.errors.email}
								touched={registeryFormik.touched.email}
								placeholder={"Email"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>

						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"password"}
								type={"password"}
								value={registeryFormik.values.password}
								error={registeryFormik.errors.password}
								touched={registeryFormik.touched.password}
								placeholder={"Password"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>
					</div>

					{/* Image URL and Alt Text */}
					<div className='row'>
						<div className='col-md-6 col-sm-12'>
							<div className='form-floating mb-3'>
								<input
									type={"text"}
									id={"image"}
									name={"image.url"}
									value={registeryFormik.values.image.url}
									placeholder={"Image URL"}
									className={`form-control`}
									onChange={registeryFormik.handleChange}
									onBlur={registeryFormik.handleBlur}
									aria-label={"url"}
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
									value={registeryFormik.values.image.alt}
									placeholder={"Image URL"}
									className={`form-control`}
									onChange={registeryFormik.handleChange}
									onBlur={registeryFormik.handleBlur}
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
					<div className='row'>
						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"address.state"}
								type={"text"}
								value={registeryFormik.values.address.state}
								error={registeryFormik.errors.address?.state}
								touched={registeryFormik.touched.address?.state}
								placeholder={"State"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>

						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"address.country"}
								type={"text"}
								value={registeryFormik.values.address.country}
								error={registeryFormik.errors.address?.country}
								touched={registeryFormik.touched.address?.country}
								placeholder={"Country"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>
					</div>
					<div className='row '>
						<div className='col-md-6 col-sm-12 mt-2'>
							<CardsInput
								name={"address.city"}
								type={"text"}
								value={registeryFormik.values.address.city}
								error={registeryFormik.errors.address?.city}
								touched={registeryFormik.touched.address?.city}
								placeholder={"City"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>
						<div className='col-md-6 col-sm-12 mt-2'>
							<CardsInput
								name={"address.street"}
								type={"text"}
								value={registeryFormik.values.address.street}
								error={registeryFormik.errors.address?.street}
								touched={registeryFormik.touched.address?.street}
								placeholder={"Street"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>
					</div>
					{/* House number and Zip */}
					<div className='row '>
						<div className='col-md-6 col-sm-12 mt-2'>
							<CardsInput
								name={"address.houseNumber"}
								type={"number"}
								value={registeryFormik.values.address.houseNumber}
								error={registeryFormik.errors.address?.houseNumber}
								touched={registeryFormik.touched.address?.houseNumber}
								placeholder={"House number"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
							/>
						</div>
						<div className='col-md-6 col-sm-12 mt-2'>
							<CardsInput
								name={"address.zip"}
								type={"number"}
								value={registeryFormik.values.address.zip}
								error={registeryFormik.errors.address?.zip}
								touched={registeryFormik.touched.address?.zip}
								placeholder={"Zip code"}
								onChange={registeryFormik.handleChange}
								onBlur={registeryFormik.handleBlur}
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
							checked={registeryFormik.values.isBusiness ? true : false}
							onChange={registeryFormik.handleChange}
						/>
						<label
							className='form-check-label fw-bold mx-2'
							htmlFor='isBusiness'
						>
							Business Account
						</label>
					</div>
					{/* Submit Button */}
					<button
						type='submit'
						className='btn btn-primary w-100 py-2 mt-3'
						disabled={!registeryFormik.dirty || !registeryFormik.isValid}
					>
						REGISTER
					</button>
				</form>
			</div>
		</main>
	);
};

export default Register;
