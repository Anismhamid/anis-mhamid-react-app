import {FunctionComponent} from "react";
import {useFormik} from "formik";
import * as yup from "yup";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const formik = useFormik({
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
			console.log(values);
		},
	});

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
				{formik.isSubmitting &&
					!formik.errors.email &&
					!formik.errors.password && (
						<div className='alert alert-danger mt-5' role='alert'>
							Something went wrong, please try again
						</div>
					)}
				{/* Submit Button */}
				<button
					type='submit'
					className='mt-5 w-100'
					disabled={formik.isSubmitting}
				>
					{formik.isSubmitting ? "just a sec..." : "Login"}
				</button>

			</form>
		</main>
	);
};

export default Login;
