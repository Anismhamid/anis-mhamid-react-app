import {FunctionComponent, useEffect, useState} from "react";
import {deleteUserById, getUserById, patchUserBusiness} from "../services/userServices";

import {edit, trash} from "../fontAwesome/Icons";

import {pathes} from "../routes/Routes";
import {useUserContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import useToken from "../hooks/useToken";
import DeleteUserModal from "../atoms/modals/DeleteUserModal";
import Loading from "./Loading";
import {successMSG} from "../atoms/taosyify/Toastify";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const [user, setUser] = useState<any>({});
	const [isLoadnig, setIsLoading] = useState<boolean>(true);
	const [render, setRender] = useState<boolean>(false);
	const {decodedToken} = useToken();
	const {setIsLogedIn, isBusiness, setIsBusiness} = useUserContext();
	const navigate = useNavigate();

	const [showDleteModal, setShowDeleteModal] = useState(false);
	const onHide = () => setShowDeleteModal(false);
	const onShow = () => setShowDeleteModal(true);

	const refresh = () => {
		setRender(!render);
	};

	useEffect(() => {
		if (decodedToken && decodedToken._id) {
			getUserById(decodedToken._id)
				.then((res) => {
					setIsLoading(false);
					setUser(res);
				})
				.catch((error) => {
					console.warn("2. Failed to fetch user data:", error);
					setIsLoading(false);
				});
		} else {
		}
	}, [decodedToken._id, isBusiness]);

	const handleDelete = (userId: string) => {
		try {
			deleteUserById(userId).then((res) => {
				setIsLogedIn(false);
				successMSG(`${res.name.first} Has been deleted`);
				navigate(pathes.cards);
				localStorage.removeItem("token");
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleSwitchChange = async () => {
		const newStatus = !isBusiness;
		setIsBusiness(newStatus);

		const updatedUserData = {isBusiness: newStatus};

		await patchUserBusiness(user._id, updatedUserData, user);
	};

	if (isLoadnig) {
		return <Loading />;
	}

	return (
		<div className='container my-5'>
			<h1 className='text-center mb-4 text-light'>User Profile</h1>
			<div className='card shadow-lg rounded-4'>
				<div className='card-body'>
					<div className='d-flex align-items-center mb-4'>
						<div className='me-4'>
							<img
								src={user.image.url}
								alt='Profile image'
								className=' rounded rounded-5 border border-3 border-light shadow-sm'
								width='150'
								height='150'
							/>
						</div>
						<div className='border'>
							<h2 className='card-title mb-2 text-muted '>
								{user && user.name.first} {user && user.name.last}
							</h2>
							<p className='text-muted mb-0'>{user.email}</p>
						</div>
					</div>
					<div className='row border'>
						<div className='col-5'>
							<h5>Phone</h5>
						</div>
						<div className='col-5'>{user.phone}</div>
					</div>
					<div className='row border'>
						<div className='col-5'>
							<h5>User Role</h5>
						</div>
						<div className='col-5'>
							<p
								className={
									user.isAdmin ? "text-success fw-bold" : "text-danger"
								}
							>
								{user.isAdmin ? "Administrator" : "Client"}
							</p>
						</div>
					</div>
					<div className='row border'>
						<div className='col-5'>
							<h5>Business account</h5>
						</div>
						<div className='col-2 border'>
							<p
								className={
									user.isBusiness
										? "text-success fw-bold"
										: "text-danger"
								}
							>
								{user.isBusiness ? "Yes" : "No"}
							</p>
						</div>
						<div className='col-5'>
							<div className='form-check form-switch'>
								<input
									className='form-check-input form-check'
									type='checkbox'
									role='switch'
									id='flexSwitchCheckChecked'
									checked={user.isBusiness ? true : false}
									onChange={handleSwitchChange}
								/>
								<label
									className='form-check-label '
									htmlFor='flexSwitchCheckChecked'
								>
									{user.isBusiness
										? "Turn Off Business Priority"
										: "Turn On Business Priority"}
								</label>
							</div>
						</div>
					</div>
					<div className='row border mt-3 p-3 w-50 m-auto'>
						<button
							className=' text-dark bg-warning-subtle mb-2'
							onClick={() => {}}
						>
							Edit <span className=' text-dark mx-2'> {edit}</span>
						</button>
						<button className='text-danger bg-danger-subtle' onClick={onShow}>
							Drop Account <span className=' mx-2'>{trash}</span>
						</button>
					</div>
				</div>
			</div>
			<DeleteUserModal
				show={showDleteModal}
				onHide={() => onHide()}
				onDelete={() => handleDelete(user._id)}
				refresh={refresh}
			/>
		</div>
	);
};

export default Profile;
