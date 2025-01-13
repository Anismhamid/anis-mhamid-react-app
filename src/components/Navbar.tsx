import {FunctionComponent, useContext, useEffect} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {pathes} from "../routes/Routes";
import {useUserContext} from "../context/UserContext";
import useToken from "../hooks/useToken";
import {fathMe, logOut} from "../fontAwesome/Icons";
import {SiteTheme} from "../theme/theme";

interface NavbarProps {
	darkSetter: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({darkSetter}) => {
	const theme = useContext(SiteTheme);
	const navigate = useNavigate();
	const {
		setAuth,
		isLogedIn,
		setIsLogedIn,
		isAdmin,
		setIsAdmin,
		setIsBusiness,
		isBusiness,
	} = useUserContext();
	const {decodedToken} = useToken();

	useEffect(() => {
		if (!decodedToken._id) {
			setIsLogedIn(false);
			setIsAdmin(false);
		} else if (decodedToken) {
			setAuth(decodedToken);
			setIsLogedIn(true);
			setIsAdmin(decodedToken.isAdmin);
			setIsBusiness(decodedToken.isBusiness);
		}
	}, [decodedToken, setAuth, setIsLogedIn, setIsAdmin, setIsBusiness]);

	// handle log out
	const handleLogout = () => {
		setAuth(null);
		setIsAdmin(false);
		setIsBusiness(false);
		setIsLogedIn(false);
		localStorage.removeItem("bCards_token");
		navigate(pathes.cards);
	};

	return (
		<header className='w-100 sticky-top'>
			<nav
				style={{backgroundColor: theme.background, color: theme.color}}
				className='navbar navbar-expand-lg shadow'
			>
				<div className='container-fluid'>
					{/* Dark Mode Toggle Button */}
					<button
						style={{backgroundColor: theme.background, color: theme.color}}
						onClick={() => darkSetter()}
						id='toggle-theme'
						aria-label='Toggle theme'
						className='btn btn-link border-primary'
					>
						{fathMe}
					</button>

					{/* Logo */}
					<NavLink className='navbar-brand logo' to={pathes.cards}>
						<img
							className='img-fluid w-75'
							src='/lightMod-bCards.png'
							alt='bCards'
						/>
					</NavLink>

					{/* Navbar Toggler for Mobile */}
					<button
						style={{color: theme.color, backgroundColor: theme.background}}
						className='navbar-toggler border-primary text-primary'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon text-primary'></span>
					</button>

					{/* Navbar Links */}
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul
							style={{
								color: theme.color,
								backgroundColor: theme.background,
							}}
							className='navbar-nav me-auto mb-2 mb-lg-0'
						>
							<li className='nav-item'>
								<NavLink
									style={{color: theme.color}}
									className='nav-link'
									to={pathes.cards}
								>
									Cards
								</NavLink>
							</li>
							{isLogedIn && (
								<>
									<li className='nav-item'>
										<NavLink
											style={{color: theme.color}}
											className='nav-link'
											to={pathes.favCards}
										>
											Fav Cards
										</NavLink>
									</li>
									<li className='nav-item'>
										<NavLink
											style={{color: theme.color}}
											className='nav-link'
											to={pathes.profile}
										>
											Profile
										</NavLink>
									</li>
									{isAdmin && (
										<li className='nav-item'>
											<NavLink
												style={{color: theme.color}}
												className='nav-link'
												to={pathes.sandBox}
											>
												SandBox
											</NavLink>
										</li>
									)}
									{isBusiness === true && (
										<li className='nav-item'>
											<NavLink
												style={{color: theme.color}}
												className='nav-link'
												to={pathes.myCards}
											>
												My Cards
											</NavLink>
										</li>
									)}
									<li className='nav-item'>
										<NavLink
											style={{color: theme.color}}
											className='nav-link'
											to={pathes.about}
										>
											About
										</NavLink>
									</li>
								</>
							)}
						</ul>
						{/* Login/Logout */}
						<div className='d-flex mt-3 mb-2 justify-content-between align-items-center'>
							{isLogedIn ? (
								<Link
									style={{
										color: theme.color,
										backgroundColor: theme.background,
									}}
									to={pathes.cards}
									onClick={handleLogout}
									className='fw-bold text-decoration-none'
								>
									<span className='logout text-danger'>
										LOG OUT <span>{logOut}</span>
									</span>
								</Link>
							) : (
								<div
									style={{
										color: theme.color,
										backgroundColor: theme.background,
									}}
									className='fw-bold'
								>
									<Link
										style={{
											color: theme.color,
											backgroundColor: theme.background,
										}}
										to={pathes.login}
										className='fw-bold mx-2 log-rig'
									>
										LOG IN
									</Link>
									|
									<NavLink
										style={{
											color: theme.color,
											backgroundColor: theme.background,
										}}
										to={pathes.register}
										className='fw-bold mx-2 log-rig'
									>
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
