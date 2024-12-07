import {FunctionComponent, useEffect, useState} from "react";
import useToken from "../customHooks/useToken";
import {deleteUserById, getUserById} from "../services/userServices";
import Loading from "../assets/loading/Loading";
import {ex, trash, ve} from "../fontAwesome/Icons";
import DeleteUserModal from "../assets/modals/users/DeleteUserModal";
import {successMSG} from "../assets/taosyify/Toastify";
import {pathes} from "../routes/Routes";
import {useUserContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const [user, setUser] = useState<any>({});
	const [isLoadnig, setIsLoading] = useState<boolean>(true);
	const {decodedToken} = useToken();
	const {setIsLogedIn} = useUserContext();
	const navigate = useNavigate();

	const [showDleteModal, setShowDeleteModal] = useState(false);
	const onHide = () => setShowDeleteModal(false);
	const onShow = () => setShowDeleteModal(true);

	useEffect(() => {
		if (decodedToken && decodedToken._id) {
			getUserById(decodedToken)
				.then((res) => {
					setIsLoading(false);
					setUser(res);
				})
				.catch((error) => {
					console.warn("2. Failed to fetch user data:", error);
					setIsLoading(false);
				});
		}
	}, [decodedToken._id]);

	const handleDelete = (userId: string) => {
		try {
			deleteUserById(userId).then(() => {
				setIsLogedIn(false);
				successMSG("");
				navigate(pathes.cards);
				localStorage.removeItem("token");
			});
		} catch (error) {
			console.log(error);
		}
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
								className='rounded-circle border border-3 border-light shadow-sm'
								width='150'
								height='150'
							/>
						</div>
						<div>
							<h2 className='card-title mb-2 text-light'>
								{user && user.name.first} {user && user.name.last}
							</h2>
							<p className='text-muted mb-0'>{user.email}</p>
						</div>
					</div>

					<table
						className='table table-bordered table-striped h5'
						data-bs-theme='dark'
					>
						<thead>
							<tr>
								<th colSpan={4}>Phone</th>
								<th colSpan={3}>Role</th>
								<th colSpan={1}>Business account</th>
								<th colSpan={4}>Last active</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colSpan={4}>{user.phone || "N/A"}</td>
								<td
									colSpan={3}
									className={
										user.isAdmin
											? "text-success fw-bold"
											: "text-danger"
									}
								>
									{user.isAdmin ? "Admin" : "User"}
								</td>

								<td
									colSpan={1}
									className={
										user.isBusiness
											? "text-success fw-bold"
											: "text-danger"
									}
								>
									{user.isBusiness ? ve : ex}
								</td>

								<td
									colSpan={4}
									className={
										user.isBusiness
											? "text-success fw-bold"
											: "text-danger"
									}
								>
									{new Date().getDay()}
								</td>
							</tr>
							<tr>
								<td
									colSpan={12}
									className=' text-danger bg-danger-subtle'
									onClick={onShow}
								>
									{trash}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<DeleteUserModal
				show={showDleteModal}
				onHide={() => onHide()}
				onDelete={() => handleDelete(user._id)}
			/>
		</div>
	);
};

export default Profile;
