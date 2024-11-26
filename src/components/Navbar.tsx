import {FunctionComponent} from "react";
import {Link, NavLink} from "react-router-dom";
import {pathes} from "../routes/Routes";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
	return (
		<header className='w-100 sticky-top'>
			<nav
				className='navbar navbar-expand-lg bg-body-tertiary w-100'
				data-bs-theme='dark'
			>
				<div className='container-fluid'>
					<NavLink className='navbar-brand logo' to='/home'>
						<img className=' img-fluid' src='/bCards.png' alt='' />
					</NavLink>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<NavLink
									className='nav-link active'
									aria-current='page'
									to={pathes.home}
								>
									Home
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									className='nav-link active'
									aria-current='page'
									to={pathes.about}
								>
									About
								</NavLink>
							</li>
						</ul>
						<div className=' d-flex justify-content-between'>
							<div className=''>
								<form className='d-flex' role='search'>
									<input
										id='search'
										name='search'
										className='form-control me-2 border-info'
										type='search'
										placeholder='Search'
										aria-label='Search'
									/>
									<button
										className='me-5 bg-info text-dark'
										type='submit'
									>
										Search
									</button>
								</form>
							</div>

							<div className=' text-light'>
								<Link
									to={pathes.login}
									type='button'
									className='fw-bold w-50 m-auto'
								>
									LOGIN
								</Link>
								|
								<NavLink
									to={pathes.register}
									type='button'
									className='fw-bold w-50 m-auto'
								>
									REGISTERY
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
