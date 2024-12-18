import {FunctionComponent} from "react";
import {Link} from "react-router-dom";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
	return (
		<div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
			<div className='text-center'>
				{/* Main Heading */}
				<h1 className='display-3 text-danger'>Oops! Page Not Found</h1>

				{/* Description */}
				<p className='lead text-muted'>
					The page you're looking for might have been moved or doesn't exist.
				</p>

				{/* Search Bar (Optional) */}
				<div className='mt-4 mb-4'>
					<input
						type='text'
						className='form-control form-control-lg w-75 mx-auto'
						placeholder='Search for something...'
					/>
				</div>

				{/* Navigation Links */}
				<div className='mt-4'>
					<Link to='/' className='btn btn-primary btn-lg mr-3'>
						Go to Home
					</Link>
					<Link to='/contact' className='btn btn-outline-secondary btn-lg'>
						Contact Support
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
