import {FunctionComponent, useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
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

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const [showPassword, setShowPassword] = useState(false);
	const {isAdmin, auth, setAuth, setIsAdmin, setIsBusiness, setIsLogedIn} =
		useUserContext();
	const theme = useContext(SiteTheme);
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const {decodedToken} = useToken();

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
					localStorage.setItem("bCards_token", res.data);
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
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<form
						onSubmit={formik.handleSubmit}
						className='login shadow-lg p-4 rounded-4 border'
					>
						<h2 className='text-center text-primary mb-4'>Login</h2>

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
								aria-label='Email address'
							/>
							{formik.touched.email && formik.errors.email && (
								<div className='invalid-feedback'>
									{formik.errors.email}
								</div>
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
								aria-label='Password'
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
						>
							{loading ? "Logging in..." : "Login"}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Login;
