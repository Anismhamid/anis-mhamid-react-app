import {FunctionComponent, useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import {pathes} from "../../routes/Routes";
import {useUserContext} from "../../context/UserContext";
import useToken from "../../customHooks/useToken";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
	const {
		setAuth,
		isLogedIn,
		setIsLogedIn,
		isAdmin,
		setIsAdmin,
		setIsBusiness,
		isBusiness,
	} = useUserContext();
	const {afterDecode} = useToken();

	useEffect(() => {
		if (afterDecode) {
			setAuth(afterDecode);
			setIsLogedIn(true);
			setIsAdmin(afterDecode.isAdmin);
			setIsBusiness(afterDecode.isBusiness);
		} else {
			setIsLogedIn(false);
			setIsAdmin(false);
		}
	}, [useToken, setAuth, isLogedIn, isAdmin, isBusiness]);

	const handleLogout = () => {
		setAuth(null);
		setIsAdmin(false);
		setIsLogedIn(false);
		localStorage.removeItem("token");
	};

	return (
		<header className='w-100 sticky-top navbar-container'>
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark shadow-lg'>
				<div className='container-fluid'>
					<NavLink className='navbar-brand logo' to={pathes.cards}>
						<img className='img-fluid w-75' src='/bCards.png' alt='bCards' />
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
								<NavLink className='nav-link' to={pathes.cards}>
									Cards
								</NavLink>
							</li>
							{isLogedIn && (
								<>
									<li className='nav-item'>
										<NavLink
											className='nav-link'
											to={pathes.favCards}
										>
											fav Cards
										</NavLink>
									</li>
									<li className='nav-item'>
										<NavLink className='nav-link' to={pathes.profile}>
											Profile
										</NavLink>
									</li>
									{isAdmin && (
										<li className='nav-item'>
											<NavLink
												className='nav-link'
												to={pathes.sandBox}
											>
												SandBox
											</NavLink>
										</li>
									)}
									<li className='nav-item'>
										<NavLink className='nav-link' to={pathes.about}>
											About
										</NavLink>
									</li>
									{isBusiness && (
										<li className='nav-item'>
											<NavLink
												className='nav-link'
												to={pathes.myCards}
											>
												my Cards
											</NavLink>
										</li>
									)}
								</>
							)}
						</ul>
						<div className='d-flex justify-content-between align-items-center'>
							<form
								className='d-flex me-3'
								onSubmit={(e) => e.preventDefault()}
							>
								<input
									id='search'
									name='search'
									className='form-control me-2 search-input'
									type='search'
									placeholder='Search'
									aria-label='Search'
								/>
								<button className='btn btn-outline-light' type='submit'>
									Search
								</button>
							</form>
							{isLogedIn ? (
								<Link
									to={pathes.cards}
									onClick={handleLogout}
									className='fw-bold text-light'
								>
									LogOut
								</Link>
							) : (
								<div className='text-light'>
									<Link to={pathes.login} className='fw-bold'>
										LOGIN
									</Link>
									|
									<NavLink to={pathes.register} className='fw-bold'>
										REGISTER
									</NavLink>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
