import {FunctionComponent, useCallback, useContext, useEffect, useState} from "react";
import {deleteUserById, getUserById, patchUserBusiness} from "../services/userServices";

import {edit, trash} from "../fontAwesome/Icons";

import {pathes} from "../routes/Routes";
import {useUserContext} from "../context/UserContext";
import {Link, useNavigate} from "react-router-dom";
import useToken from "../hooks/useToken";
import Loading from "./Loading";
import {errorMSG, successMSG} from "../atoms/taosyify/Toastify";
import {User} from "../interfaces/User";
import {SiteTheme} from "../theme/theme";
import Button from "../atoms/buttons/Button";
import DeleteModal from "../atoms/modals/DeleteModal";
import GlobalModal from "../atoms/modals/GlobalModal";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const [user, setUser] = useState<any>({});
	const [isLoadnig, setIsLoading] = useState<boolean>(true);
	const [render, setRender] = useState<boolean>(false);
	const {decodedToken} = useToken();
	const {setIsLogedIn, isBusiness, setIsBusiness, setAuth, setIsAdmin} =
		useUserContext();
	const navigate = useNavigate();
	const theme = useContext(SiteTheme);
	const [showDleteModal, setShowDeleteModal] = useState(false);
	const [showModalGl, setShowDModalGl] = useState(false);

	const onHide = useCallback<() => void>((): void => setShowDeleteModal(false), []);
	const onShow = useCallback<() => void>((): void => setShowDeleteModal(true), []);
	const onHideGl = useCallback<() => void>((): void => setShowDModalGl(false), []);
	const onShowGl = useCallback<() => void>((): void => setShowDModalGl(true), []);

	const refresh = () => {
		setRender(!render);
	};

	useEffect(() => {
		if (decodedToken._id) {
			getUserById(decodedToken._id)
				.then((res) => {
					setIsLoading(false);
					setUser(res);
				})
				.catch(() => {
					errorMSG("2. Failed to fetch user data:");
					setIsLoading(false);
				});
		} else {
		}
	}, [decodedToken._id, render]);

	// Profile handle Delete
	const handleDelete: Function = (userId: string) => {
		try {
			deleteUserById(userId).then((res) => {
				setIsLogedIn(false);
				successMSG(`${res.name.first} Has been deleted`);
				localStorage.removeItem("bCards_token");
				navigate(pathes.cards);
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Profile handle switch user business
	const handleSwitchChange: Function = async () => {
		const newData = !isBusiness;

		setIsBusiness(newData);

		try {
			const updatedUserData: {isBusiness: boolean} = {isBusiness: newData};
			await patchUserBusiness(user._id, updatedUserData, user);

			const updatedUser: User = await getUserById(decodedToken._id);
			setUser(updatedUser as User);
		} catch (error) {
			console.error("Error updating data:", error);
		}
	};

	const handleLogout = () => {
		setAuth(null);
		setIsAdmin(false);
		setIsBusiness(false);
		setIsLogedIn(false);
		localStorage.removeItem("bCards_token");
		navigate(pathes.cards);
	};

	if (isLoadnig) {
		return <Loading />;
	}

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<Button text='Home' path={() => navigate(pathes.cards)} />
			<h6 className='lead display-5 my-3 fw-bold'>Profile</h6>
			<hr className=' w-25' />
			<div className='container m-auto'>
				<div
					style={{
						backgroundColor: theme.background,
						color: theme.color,
						maxWidth: "40rem",
						margin: "auto",
					}}
					className='card shadow-lg rounded-4 p-1'
					data-bs-theme='dark'
				>
					<div className='card-body'>
						<div className='d-flex align-items-center mb-4'>
							<div className='me-4'>
								<Link to={`/userDetails/${user._id}`}>
									<img
										src={user.image.url}
										alt='Profile image'
										className=' shadow rounded rounded-5 border p-1 border-dark-subtle shadow'
										width='150'
										height='150'
									/>
								</Link>
							</div>
							<div className=''>
								<h2 className='card-title mb-2  '>
									<strong>{user && user.name.first} </strong>
									{user && user.name.last}
								</h2>
								<hr />
								<h5 className='mb-0 card-subtitle'>{user.email || ""}</h5>
							</div>
						</div>
						<div className='row  py-2 lead border rounded-3'>
							<div className='col-5'>
								<h5 className=' '>Phone</h5>
							</div>
							<div className='col-5'>{user.phone}</div>
						</div>
						<div className='row py-2'>
							<div className='col-5'>
								<h5>User Role</h5>
							</div>
							<div className='col-5'>
								<p
									className={
										user.isAdmin
											? "text-success fw-bold"
											: "text-info fw-bold"
									}
								>
									{user.isAdmin ? "Administrator" : "Client"}
								</p>
							</div>
						</div>
						<div className='row border rounded-1'>
							<div className='col-5'>
								<h5>Business account</h5>
							</div>
							<div className='col-2 border-start border-end'>
								<p
									className={
										user.isBusiness === true
											? "text-success fw-bold"
											: "text-danger fw-bold"
									}
								>
									{user.isBusiness === true ? "Yes" : "No"}
								</p>
							</div>
							<div className='col-5'>
								<div className='form-check form-switch'>
									<input
										className='form-check-input form-check'
										type='checkbox'
										role='switch'
										id='flexSwitchCheckChecked'
										checked={user.isBusiness}
										onChange={() => {
											onShowGl();
										}}
									/>
									<GlobalModal
										show={showModalGl}
										onHide={() => onHideGl()}
										navegateTo={async () => {
											await handleSwitchChange();
											handleLogout();
										}}
										header={"Change account type"}
										bodyText={"You need to login again"}
									/>
									<label
										className='form-check-label fw-bold'
										htmlFor='flexSwitchCheckChecked'
									>
										{user.isBusiness
											? "Turn Off Business Priority"
											: "Turn On Business Priority"}
									</label>
								</div>
							</div>
						</div>
						<div className='row mt-3 p-3 m-auto text-center '>
							<button
								onClick={() => navigate(`/userDetails/${user._id}`)}
								className='col-6'
							>
								<span className='text-warning'>Edit {edit}</span>
							</button>
							<button onClick={() => onShow()} className='col-6'>
								<span className='text-danger'>Delete {trash}</span>
							</button>
						</div>
					</div>
				</div>
				<DeleteModal
					toDelete='User account'
					show={showDleteModal}
					onHide={() => onHide()}
					onDelete={() => handleDelete(user._id)}
					render={() => refresh()}
					navigateTo={pathes.login}
				/>
			</div>
		</main>
	);
};

export default Profile;
