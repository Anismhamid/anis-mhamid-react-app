import {FunctionComponent, useState, useEffect, useContext, useCallback} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getUserById, loginIn} from "../services/userServices";
import {pathes} from "../routes/Routes";
import * as yup from "yup";
import {FormikValues, useFormik} from "formik";
import {UserLogin} from "../interfaces/User";
import {useUserContext} from "../context/UserContext";
import useToken from "../hooks/useToken";
import {errorMSG, wellcomeMSG} from "../atoms/taosyify/Toastify";
import Loading from "./Loading";
import {SiteTheme} from "../theme/theme";
import {closedEye, eye} from "../fontAwesome/Icons";
import SocilasModal from "../atoms/socialsModal/SocilasModal";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const [showPassword, setShowPassword] = useState(false);
	const {isAdmin, auth, setAuth, setIsAdmin, setIsBusiness, setIsLogedIn} =
		useUserContext();
	const theme = useContext(SiteTheme);
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const {decodedToken} = useToken();
	const [showSocialModal, setShowSocialModall] = useState<boolean>(false);
	const onShowSocialModal = useCallback(() => setShowSocialModall(true), []);
	const onHideSocialModal = useCallback(() => setShowSocialModall(false), []);

	useEffect(() => {
		const token = localStorage.bCards_token;
		if (token && decodedToken._id) {
			setIsLogedIn(true);
			navigate(pathes.cards);
		} else {
			setIsLogedIn(false);
		}
	}, [decodedToken]);

	useEffect(() => {
		try {
			if (decodedToken._id)
				getUserById(decodedToken._id)
					.then(() => {
						setAuth({...decodedToken, isAdmin: isAdmin});
						setIsAdmin(decodedToken.isAdmin);
						setIsBusiness(auth?.isBusiness ? true : false);
						setIsLogedIn(true);
					})
					.catch((err) => {
						wellcomeMSG(err);
						setIsLogedIn(false);
					});
		} catch (err) {
			errorMSG("Failed to find user");
			setIsLogedIn(false);
		}
	}, []);

	useEffect(() => {
		if (decodedToken && localStorage.bCards_token) {
			setIsLogedIn(true);
			navigate(pathes.cards);
		} else {
			setIsLogedIn(false);
			return;
		}
	}, [decodedToken]);

	const validationSchema = yup.object({
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
	});

	const formik: FormikValues = useFormik<UserLogin>({
		initialValues: {email: "", password: ""},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setLoading(true);
			loginIn(values)
				.then((res) => {
					setLoading(false);
					JSON.stringify(localStorage.setItem("bCards_token", res.data));
					navigate(pathes.cards);
				})
				.catch(() => {
					setLoading(false);
					errorMSG("User not exist try anoter email.");
				});
		},
	});

	if (loading) return <Loading />;

	return (
		<>
			<main style={{backgroundColor: theme.background, color: theme.color}}>
				{formik.error && <p className=' text-danger'>{formik.error}</p>}

				<form
					className='login shadow-lg p-4 rounded-4'
					onSubmit={formik.handleSubmit}
					aria-labelledby='login-form'
				>
					<h2 className='text-center text-primary mb-4' id='login-form'>
						Login
					</h2>
					<div className='form-floating mb-3'>
						<input
							type='email'
							autoComplete='off'
							className={`form-control ${
								formik.touched.email && formik.errors.email
									? "is-invalid"
									: ""
							}`}
							id='email'
							name='email'
							placeholder='name@example.com'
							value={formik.values.email}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							disabled={loading}
							aria-label='Enter your email address'
						/>
						{formik.touched.email && formik.errors.email && (
							<div className='invalid-feedback'>{formik.errors.email}</div>
						)}
						<label
							htmlFor='email'
							className='form-label fw-bold text-secondary'
						>
							Email address
						</label>
					</div>

					<div className='form-floating mb-3'>
						<input
							type={showPassword ? "text" : "password"}
							autoComplete='off'
							className={`form-control ${
								formik.touched.password && formik.errors.password
									? "is-invalid"
									: ""
							}`}
							id='password'
							name='password'
							placeholder='Password'
							value={formik.values.password}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							disabled={loading}
							aria-label='Enter your password'
						/>
						<button
							type='button'
							onClick={() => setShowPassword((prev) => !prev)}
							style={{
								position: "absolute",
								right: "10px",
								top: "50%",
								transform: "translateY(-50%)",
							}}
							className='btn btn-link'
							aria-label={`Toggle password visibility`}
						>
							{showPassword ? eye : closedEye}{" "}
						</button>
						{formik.touched.password && formik.errors.password && (
							<div className='invalid-feedback'>
								{formik.errors.password}
							</div>
						)}
						<label
							htmlFor='password'
							className='form-label fw-bold text-secondary'
						>
							Password
						</label>
					</div>
					<button
						type='submit'
						className='btn btn-primary w-100 py-2 mt-4 fw-bold shadow-sm'
						disabled={!formik.dirty || !formik.isValid || loading}
						aria-label={loading ? "Logging in" : "Submit login form"}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
					<hr />
					<div className='container'>
						<button
							onClick={() => {
								onShowSocialModal();
							}}
							className='fw-bold d-block my-3 m-auto'
						>
							<img
								src='/images/facebook.png'
								className='img-fluid face m-2'
								alt='Facebook login'
								aria-label='Facebook login button'
							/>
							Log in with Facebook
						</button>
						<hr />
						<button
							onClick={() => {
								onShowSocialModal();
							}}
							className='fw-bold d-block my-3 m-auto'
							aria-label='Log in with Google'
						>
							<img
								aria-disabled='true'
								src='/images/google.png'
								className='img-fluid face m-2'
								alt='Google login'
								aria-label='Google login button'
							/>
							log in with Google
						</button>
					</div>
				</form>
				<div className='row border reg rounded-4 mb-2 h-100'>
					<div className='col'>
						<p style={{fontSize: "16px"}} className=' fw-bold text-center '>
							Don't have an account?
							<Link to='/register' aria-label='Go to registration page'>
								<span className=' text-primary mx-2'>Register Now</span>
							</Link>
						</p>
					</div>
				</div>
				<div className='one'>
					<hr className='w-75 m-auto automatic-border m-5' />
				</div>
				<p className='text-center mt-3 display-6'>Download the app</p>
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
							className='icons'
							rel='noopener noreferrer'
							target='_Blank'
							to='https://www.apple.com/app-store/'
							aria-label='Download from Apple Store'
						>
							<img
								className='image w-100 m-auto h-100'
								src='/images/Apple.png'
								alt='Apple Store'
							/>
						</Link>
					</div>
				</div>
			</main>
			<SocilasModal
				show={showSocialModal}
				onHide={onHideSocialModal}
				bodyText={"Comming Soon . . ."}
				header={`Connect with yor account`}
			/>
		</>
	);
};

export default Login;
