import {FunctionComponent, useCallback, useEffect, useMemo, useState} from "react";
import {deleteUserById, getAllUsers} from "../services/userServices";
import {User} from "../interfaces/User";
import {Link, useNavigate} from "react-router-dom";
import {edit, trash} from "../fontAwesome/Icons";
import {Pagination} from "react-bootstrap";
import {pathes} from "../routes/Routes";
import {useUserContext} from "../context/UserContext";
import useToken from "../hooks/useToken";
import {errorMSG, infoMSG} from "../atoms/taosyify/Toastify";
import Loading from "./Loading";
import DeleteUserModal from "../atoms/modals/DeleteUserModal";

const SandBox: FunctionComponent = () => {
	const usersPerPage = 50;
	const navigate = useNavigate();
	const {decodedToken} = useToken();
	const {isAdmin} = useUserContext();
	const [users, setUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setISLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [userSearch, setUserSearch] = useState<User[] | null>(null);
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
	const [render, setRender] = useState<boolean>(false);
	const onHide = () => setShowDeleteModal(false);
	const onShow = () => setShowDeleteModal(true);

	// Pagination logic
	const startIndex = (currentPage - 1) * usersPerPage;

	const usersToDisplay = useMemo(() => {
		if (userSearch) {
			return userSearch;
		}
		return users;
	}, [userSearch, users]);

	const currentUsers = useMemo(() => {
		return usersToDisplay.slice(startIndex, startIndex + usersPerPage);
	}, [usersToDisplay, startIndex]);

	// Fetch users on admin access
	useEffect(() => {
		if (isAdmin) {
			getAllUsers()
				.then((res) => {
					setUsers(res);
					setISLoading(false);
				})
				.catch((err) => {
					console.log(err);
					errorMSG("Error fetching users.");
					setISLoading(false);
				});
		} else {
			errorMSG("Can't find this page");
			navigate(pathes.cards);
		}
	}, [render, isAdmin]);

	const refresh = () => setRender(!render);

	// Handle Edit
	const handleEdit = useCallback((userId: string) => {
		setSelectedUserId(userId);
	}, []);

	// Handle Delete
	const handleDelete = (userId: string) => {
		try {
			deleteUserById(userId)
				.then(() => {
					setUsers((prevUsers: User[]) =>
						prevUsers.filter((user) => user._id !== userId),
					);
					infoMSG("User deleted successfully.");
				})
				.catch((err) => {
					console.log(err);
					errorMSG("Error deleting user.");
				});
		} catch (error) {
			console.log(error);
			errorMSG("Failed to delete user.");
		}
	};

	// Handle search
	const handleSearch = useCallback((name: string) => {
		setSearchTerm(name);
		setCurrentPage(1);
	}, []);

	const filteredUsers = useMemo(() => {
		const query = searchTerm.trim().toLowerCase();
		if (!query) return null;

		return users.filter((user) => {
			const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
			const phone = user.phone.toLowerCase();
			const email = user.email?.toLowerCase();
			return (
				fullName.includes(query) ||
				phone.includes(query) ||
				email?.includes(query)
			);
		});
	}, [searchTerm]);

	// Loading state
	if (isLoading) return <Loading />;

	return (
		<>
			<div className='d-flex justify-content-around'>
				<h2 className='text-light'>SandBox</h2>
				<div className='mt-3 mb-3'>
					<form className='d-flex me-3' onSubmit={(e) => e.preventDefault()}>
						<input
							id='search2'
							name='search2'
							className='form-control me-2 search-input'
							type='search'
							placeholder='Search'
							aria-label='Search'
							onChange={(e) => handleSearch(e.target.value)}
						/>
						<button
							type='submit'
							onClick={() => setUserSearch(filteredUsers)}
							className='btn btn-primary'
						>
							Search
						</button>
					</form>
				</div>
			</div>

			{/* Displaying the user result or all users */}
			{userSearch && userSearch.length > 0 ? (
				<div className='user-found card bg-dark min-vh-100'>
					<h3>User Found:</h3>
					{userSearch.map((user) => (
						<div
							className='card text-light fw-bold'
							data-bs-theme='dark'
							key={user._id}
						>
							<div className='card-body'>
								<p>
									<strong>Name:</strong> {user.name.first}
								</p>
								<p>
									<strong>Email:</strong> {user.email}
								</p>
								<Link to={`/userDetails/${user._id}`}>
									<img
										className='img-fluid'
										src={user.image.url || "/avatar-design.png"}
										alt={user.name.first}
										style={{
											width: "100px",
											height: "100px",
											borderRadius: "50%",
										}}
									/>
								</Link>
							</div>

							{isAdmin === true && (
								<>
									<div className='d-flex text-end justify-content-end my-3'>
										<Link to={`/userDetails/${user._id}`}>
											<button
												className='text-warning mx-5'
												onClick={() =>
													handleEdit(user._id as string)
												}
											>
												{edit}
											</button>
										</Link>
										<DeleteUserModal
											refresh={refresh}
											show={showDeleteModal}
											onHide={onHide}
											onDelete={() =>
												handleDelete(user._id as string)
											}
										/>
										<button
											className='text-danger'
											onClick={onShow}
										>
											{trash}
										</button>
									</div>
								</>
							)}
						</div>
					))}
				</div>
			) : (
				<div className='table-responsive'>
					<table className='table table-striped table-dark'>
						<thead>
							<tr>
								<th colSpan={2}>Full Name</th>
								<th colSpan={8}>Image</th>
								<th colSpan={1}>Edit</th>
								<th colSpan={1}>Delete</th>
							</tr>
						</thead>
						<tbody>
							{currentUsers.map((user: User) => (
								<tr key={user._id}>
									<td colSpan={2}>
										{user.name.first} {user.name.last}
									</td>
									<td colSpan={8}>
										<Link to={`/userDetails/${user._id}`}>
											<img
												className='img-fluid'
												src={
													user.image.url || "/avatar-design.png"
												}
												alt={`${user.image?.alt}'s profile`}
												style={{
													width: "50px",
													height: "50px",
													borderRadius: "50%",
												}}
											/>
										</Link>
									</td>
									{decodedToken?.isAdmin && (
										<>
											<td colSpan={1}>
												<Link to={`/userDetails/${user._id}`}>
													<button className='text-warning '>
														{edit}
													</button>
												</Link>
											</td>
											<td colSpan={1}>
												<DeleteUserModal
													refresh={refresh}
													show={showDeleteModal}
													onHide={onHide}
													onDelete={() =>
														handleDelete(user._id as string)
													}
												/>
												<button
													className='text-danger '
													onClick={onShow}
												>
													{trash}
												</button>
											</td>
										</>
									)}
								</tr>
							))}
						</tbody>
					</table>

					{/* Pagination */}
					<div className='container-sm'>
						<Pagination
							className='m-auto w-100 d-flex justify-content-center mb-3 flex-wrap'
							data-bs-theme='dark'
						>
							{[
								...Array(Math.ceil(usersToDisplay.length / usersPerPage)),
							].map((_, i) => (
								<Pagination.Item
									key={i}
									active={currentPage === i + 1}
									onClick={() => {
										setCurrentPage(i + 1);
									}}
								>
									{i + 1}
								</Pagination.Item>
							))}
						</Pagination>
					</div>
				</div>
			)}
		</>
	);
};

export default SandBox;
