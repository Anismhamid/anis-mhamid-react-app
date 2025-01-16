import {FunctionComponent, useContext} from "react";
import {SiteTheme} from "../theme/theme";
import {about, heart, home, business, profile, users} from "../fontAwesome/Icons";
import {Link, useLocation} from "react-router-dom";
import {pathes} from "../routes/Routes";
import {useUserContext} from "../context/UserContext";
import {ButtonToolbar, OverlayTrigger} from "react-bootstrap";
import {tooltips} from "../atoms/ToolTip";

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
					className='footer fixed-bottom d-flex flex-grow-1 '
				>
					{isAdmin && (
						<div
							style={{
								backgroundColor: isActive(pathes.sandBox)
									? "#83B4BC"
									: "",
							}}
							className={` footer-icon `}
						>
							<Link to={pathes.sandBox}>
								<ButtonToolbar>
									<OverlayTrigger
										placement='top'
										overlay={tooltips.sandBox}
									>
										<button
											className={`${
												isActive(pathes.sandBox)
													? "text-danger"
													: "text-light"
											} rounded-5 fs-6`}
										>
											{users}
										</button>
									</OverlayTrigger>
								</ButtonToolbar>
							</Link>
						</div>
					)}
					<div
						style={{
							backgroundColor: isActive(pathes.favCards) ? "#83B4BC" : "",
						}}
						className={` footer-icon `}
					>
						<Link to={pathes.favCards}>
							<ButtonToolbar>
								<OverlayTrigger
									placement='top'
									overlay={tooltips.favCards}
								>
									<button
										className={`${
											isActive(pathes.favCards)
												? "text-info"
												: "text-light"
										} rounded-5 fs-5`}
									>
										{heart}
									</button>
								</OverlayTrigger>
							</ButtonToolbar>
						</Link>
					</div>
					<div
						style={{
							backgroundColor: isActive(pathes.profile) ? "#83B4BC" : "",
						}}
						className={` footer-icon `}
					>
						<Link to={pathes.profile}>
							<ButtonToolbar>
								<OverlayTrigger
									placement='top'
									overlay={tooltips.profile}
								>
									<button
										className={`${
											isActive(pathes.profile)
												? "text-info"
												: "text-light"
										} rounded-5 fs-5`}
									>
										{profile}
									</button>
								</OverlayTrigger>
							</ButtonToolbar>
						</Link>
					</div>
					<div
						style={{
							backgroundColor: isActive(pathes.cards) ? "#83B4BC" : "",
						}}
						className={` footer-icon `}
					>
						<Link to={pathes.cards}>
							<ButtonToolbar />
							<OverlayTrigger placement='top' overlay={tooltips.cards}>
								<button
									className={`${
										isActive(pathes.cards)
											? "text-info"
											: "text-light"
									} rounded-5 fs-2`}
								>
									{home}
								</button>
							</OverlayTrigger>
						</Link>
					</div>
					{isBusiness && (
						<div
							style={{
								backgroundColor: isActive(pathes.myCards)
									? "#83B4BC"
									: "",
							}}
							className={` footer-icon `}
						>
							<Link to={pathes.myCards}>
								<ButtonToolbar>
									<OverlayTrigger
										placement='top'
										overlay={tooltips.myCards}
									>
										<button
											className={`${
												isActive(pathes.myCards)
													? "text-info"
													: "text-light"
											} rounded-5 fs-5`}
										>
											{business}
										</button>
									</OverlayTrigger>
								</ButtonToolbar>
							</Link>
						</div>
					)}

					<div
						style={{
							backgroundColor: isActive(pathes.about) ? "#83B4BC" : "",
						}}
						className={` footer-icon`}
					>
						<Link to={pathes.about} className='text-primary'>
							<ButtonToolbar>
								<OverlayTrigger placement='top' overlay={tooltips.about}>
									<button
										className={`${
											isActive(pathes.about)
												? "text-info"
												: "text-light"
										} rounded-5 fs-6`}
									>
										{about}
									</button>
								</OverlayTrigger>
							</ButtonToolbar>
						</Link>
					</div>
				</footer>
			)}
		</>
	);
};

export default Sidebar;
