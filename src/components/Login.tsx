import {FunctionComponent, useEffect, useState} from "react";
import {FormikValues, useFormik} from "formik";
import * as yup from "yup";
import {User} from "../interfaces/User";
import {useNavigate} from "react-router-dom";
import {pathes} from "../routes/Routes";
import Loading from "../assets/loading/Loading";
import {getAllUsers} from "../services/userServices";
import {errorMSG, successMSG} from "../assets/taosyify/Toastify";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [render, setRender] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getAllUsers()
			.then((response) => {
				setUsers(response.data);
				setLoading(false);
				console.log(response.data);
			})
			.catch((error: Error) => {
				console.log(error);
			});
	}, [render]);
	const tesRendering = () => {
		setRender(!render);
	};
	const formik: FormikValues = useFormik<FormikValues>({
		initialValues: {email: "", password: ""},
		validationSchema: yup.object({
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
		}),
		onSubmit: (values) => {
			const checkUser = users.find((user) => user.email === values.email);

			if (checkUser) {
				localStorage.setItem("token", JSON.stringify(checkUser._id));
				navigate(pathes.home);
				successMSG(`welcome ${values.email}`);
			} else {
				errorMSG("invalid password or email");
				tesRendering();
			}
		},
	});

	if (loading) {
		return <Loading />;
	}

	return (
		<main className='container'>
			<form onSubmit={formik.handleSubmit} className='login'>
				{/* Email Input */}
				<div className='form-floating mb-3'>
					<input
						type='email'
						className='form-control'
						id='email'
						placeholder='name@example.com'
						value={formik.values.email}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
					/>
					{formik.touched.email && formik.errors.email && (
						<p className='text-danger'>{formik.errors.email}</p>
					)}
					<label htmlFor='email'>Email address</label>
				</div>

				{/* Password Input */}
				<div className='form-floating mt-4'>
					<input
						type='password'
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
				{/* Submit Button */}
				<button
					type='submit'
					className='mt-5 w-100 bg-gradient'
					disabled={!formik.dirty || !formik.isValid}
				>
					Login
				</button>
			</form>
		</main>
	);
};

export default Login;
