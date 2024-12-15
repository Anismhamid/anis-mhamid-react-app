import {FunctionComponent, useContext} from "react";
import {SiteTheme} from "../theme/theme";
import {about, heart, home, business, profile, users} from "../fontAwesome/Icons";
import {Link, useLocation} from "react-router-dom";
import {pathes} from "../routes/Routes";
import {useUserContext} from "../context/UserContext";

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
	const theme = useContext(SiteTheme);
	const {isAdmin, isLogedIn, isBusiness} = useUserContext();
	const location = useLocation();

	const isActive = (path: string) => location.pathname === path;

	return (
		<>
			{isLogedIn && (
				<footer
					style={{backgroundColor: theme.background, color: theme.color}}
					className='footer fixed-bottom d-flex border-top'
				>
					{isAdmin && (
						<div
							className={` footer-icon ${
								isActive(pathes.sandBox) ? "bg-info" : ""
							}`}
							title='SandBox'
						>
							<Link to={pathes.sandBox}>
								<span>{users}</span>
							</Link>
						</div>
					)}
					<div
						className={` footer-icon ${
							isActive(pathes.favCards) ? "bg-info" : ""
						}`}
						title='Favorie Cards'
					>
						<Link to={pathes.favCards}>
							<span>{heart}</span>
						</Link>
					</div>
					{isBusiness && (
						<div
							className={` footer-icon ${
								isActive(pathes.myCards) ? "bg-info" : ""
							}`}
							title='My Business Cards'
						>
							<Link to={pathes.myCards}>
								<span>{business}</span>
							</Link>
						</div>
					)}
					<div
						className={` footer-icon ${
							isActive(pathes.cards) ? "bg-info" : ""
						}`}
						title='Home'
					>
						<Link to={pathes.cards}>
							<span>{home}</span>
						</Link>
					</div>
					<div
						className={` footer-icon ${
							isActive(pathes.profile) ? "bg-info" : ""
						}`}
						title='My Profile'
					>
						<Link to={pathes.profile}>
							<span> {profile}</span>
						</Link>
					</div>
					<div
						className={` footer-icon ${
							isActive(pathes.about) ? "bg-info" : ""
						}`}
					>
						<Link to={pathes.about} title='About' className='text-primary'>
							<span> {about}</span>
						</Link>
					</div>
				</footer>
			)}
		</>
	);
};

export default Sidebar;
