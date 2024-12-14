import {FunctionComponent, useContext, useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {pathes} from "../routes/Routes";
import {useUserContext} from "../context/UserContext";
import useToken from "../hooks/useToken";
import {fathMe} from "../fontAwesome/Icons";
import {SiteTheme} from "../App";

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
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		if (decodedToken) {
			setAuth(decodedToken);
			setIsLogedIn(true);
			setIsAdmin(decodedToken.isAdmin);
			setIsBusiness(decodedToken.isBusiness);
		} else {
			setIsLogedIn(false);
			setIsAdmin(false);
		}
	}, [decodedToken, setAuth, setIsLogedIn, setIsAdmin, setIsBusiness]);

	const handleLogout = () => {
		setAuth(null);
		setIsAdmin(false);
		setIsBusiness(false);
		setIsLogedIn(false);
		localStorage.removeItem("token");
		navigate(pathes.cards);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			// Handle your search functionality here
			console.log("Searching for:", searchTerm);
		}
	};

	return (
		<header className='w-100 sticky-top'>
			<nav
				style={{backgroundColor: theme.background, color: theme.color}}
				className='navbar navbar-expand-lg shadow-lg'
			>
				<div className='container-fluid'>
					{/* Dark Mode Toggle Button */}
					<button
						onClick={() => darkSetter()}
						id='toggle-theme'
						aria-label='Toggle theme'
						className='btn btn-link'
					>
						{fathMe}
					</button>

					{/* Logo */}
					<NavLink className='navbar-brand logo' to={pathes.cards}>
						<img className='img-fluid w-75' src='/bCards.png' alt='bCards' />
					</NavLink>

					{/* Navbar Toggler for Mobile */}
					<button
						style={{color: theme.color, backgroundColor: theme.background}}
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span
							style={{
								color: theme.color,
								backgroundColor: theme.background,
							}}
							className='navbar-toggler-icon'
						></span>
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
									<li className='nav-item'>
										<NavLink
											style={{color: theme.color}}
											className='nav-link'
											to={pathes.about}
										>
											About
										</NavLink>
									</li>
									{isBusiness && (
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
								</>
							)}
						</ul>

						{/* Search Bar */}
						<form
							className='d-flex me-3'
							onSubmit={handleSearch}
							aria-label='Search cards'
						>
							<input
								id='search'
								name='search'
								className='form-control me-2 search-input'
								type='search'
								placeholder='Search'
								aria-label='Search'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<button className='btn btn-outline-info' type='submit'>
								Search
							</button>
						</form>

						{/* Login/Logout */}
						<div className='d-flex justify-content-between align-items-center'>
							{isLogedIn ? (
								<Link
									style={{
										color: theme.color,
										backgroundColor: theme.background,
									}}
									to={pathes.cards}
									onClick={handleLogout}
									className='fw-bold'
								>
									LogOut
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
										LOGIN
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
