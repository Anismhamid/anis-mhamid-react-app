import {FunctionComponent, useEffect, useState} from "react";
import useToken from "../customHooks/useToken";
import {getUserById} from "../services/userServices";
import Loading from "../assets/loading/Loading";
import {ex, ve} from "../fontAwesome/Icons";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const [user, setUser] = useState<any>({});
	const [isLoadnig, setIsLoading] = useState<boolean>(true);
	const {decodedToken} = useToken();

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
								src={user.image.url || "public/avatar-design.png"}
								alt='Profile image'
								className='rounded-circle border border-3 border-light shadow-sm'
								width='150'
								height='150'
							/>
						</div>
						<div>
							<h2 className='card-title mb-2 text-light'>
								{user.name?.first} {user.name?.last}
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
									{(new Date().getDate(), new Date().getFullYear())}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Profile;
