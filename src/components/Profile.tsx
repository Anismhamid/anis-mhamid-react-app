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
			<h6 className='lead display-5 pt-3 fw-bold'>Profile</h6>
			<hr />
			<Button text='Home' path={() => navigate(pathes.cards)} />
			{user && <span className='m-5 success rounded-5 px-2'>Active</span>}
			<div className='container m-auto mt-5'>
				<div
					style={{
						backgroundColor: theme.background,
						color: theme.color,
						margin: "auto",
					}}
					className='shadow-lg rounded-4 p-1 border'
					data-bs-theme='dark'
				>
					<div className='card-body'>
						<div className='d-flex align-items-center mb-4'>
							<div className='me-4'>
								<Link to={`/userDetails/${user._id}`}>
									<img
										src={user.image.url}
										alt='Profile image'
										className='shadow rounded-2 border p-1 border-dark-subtle'
										width='100'
										height='100'
									/>
								</Link>
							</div>
							<div className=''>
								<h2 className='card-title mb-2'>
									<strong>{user && user.name.first} </strong>
									{user && user.name.last}
								</h2>
								<h5 className='mb-0 card-subtitle'>{user.email || ""}</h5>
								<hr />
							</div>
						</div>
						<div className='row bg-light text-dark py-2 lead shadow rounded-top-3'>
							<div className='col-5'>
								<h5 >
									Phone
								</h5>
							</div>
							<div className='col-5'>{user.phone}</div>
						</div>
						<div className=' row filter py-4'>
							<div className='col-5'>
								<h5 className='my-5'>User Role</h5>
							</div>
							<div className='col-5'>
								<p
									className={
										user.isAdmin
											? "text-success fw-bold fs-5"
											: "text-info fw-bold fs-5"
									}
								>
									{user.isAdmin ? "Administrator" : "Client"}
								</p>
							</div>
						</div>
						<div className='row rounded-bottom-3  bg-light py-2 lead shadow'>
							<div className='col-5'>
								<h5>Business account</h5>
							</div>
							<div className='col-2 border-start border-end'>
								<p
									className={
										user.isBusiness === true
											? "text-success"
											: "text-danger"
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
										className='form-check-label fw-bold fs-6'
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
								<span className='text-danger'>Deactive {trash}</span>
							</button>
						</div>
					</div>
				</div>
				<DeleteModal
					method='Deactive'
					toDelete='Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.'
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
