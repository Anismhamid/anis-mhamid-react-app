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
		<main className='container'>
			<form onSubmit={formik.handleSubmit} className='login'>
				<div className='form-floating mb-3'>
					<input
						type='email'
						autoComplete='off'
						className='form-control'
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
						<p className='text-danger' id='emailError'>
							{formik.errors.email}
						</p>
					)}
					<label htmlFor='email'>Email address</label>
				</div>

				<div className='form-floating mt-4'>
					<input
						type='text'
						autoComplete='off'
						className='form-control'
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
						<p className='text-danger' id='passwordError'>
							{formik.errors.password}
						</p>
					)}
					<label htmlFor='password'>Password</label>
				</div>

				<button
					type='submit'
					className='mt-5 w-100 bg-gradient'
					disabled={!formik.dirty || !formik.isValid || loading}
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
		</main>
	);
};

export default Login;
