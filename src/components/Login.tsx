import {FunctionComponent, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getUserById, loginIn} from "../services/userServices";
import {wellcomeMSG, errorMSG} from "../assets/taosyify/Toastify";
import {pathes} from "../routes/Routes";
import * as yup from "yup";
import {FormikValues, useFormik} from "formik";
import {UserLogin} from "../interfaces/User";
import {useUserContext} from "../context/UserContext";
import useToken from "../customHooks/useToken";
import Loading from "../assets/loading/Loading";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const {setAuth, setIsAdmin, setIsLogedIn} = useUserContext();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const {afterDecode} = useToken();

	useEffect(() => {
		if (afterDecode && localStorage.token) {
			setIsLogedIn(true);
			navigate(pathes.cards);
		} else {
			setIsLogedIn(false);
		}
	}, [afterDecode]);

	useEffect(() => {
		try {
			getUserById(afterDecode._id)
				.then(() => {
					setAuth(afterDecode);
					setIsAdmin(afterDecode.isAdmin);
					setIsLogedIn(true);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			errorMSG("Failed to fetch user afterDecode");
			console.error(err);
		}
	}, [navigate]);

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
					localStorage.setItem("token", res.data);
					document.cookie = `token=${res.data}; path=/; secure; HttpOnly; SameSite=Strict`;

					navigate(pathes.cards);
					wellcomeMSG("Welcome Back! 🦄");
				})
				.catch((err) => {
					setLoading(false);
					errorMSG("Login failed, please try again.");
					console.error(err);
				});
		},
	});

	if (loading) {
		return <Loading />;
	}

	return (
		<main className='container mt-5'>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<form
						onSubmit={formik.handleSubmit}
						className='login shadow-lg p-4 rounded-3 bg-white'
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
								type='password'
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
