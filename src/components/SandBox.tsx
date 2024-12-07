import {FunctionComponent, useEffect, useMemo, useRef, useState} from "react";
import useToken from "../customHooks/useToken";
import {deleteUserById, getAllUsers} from "../services/userServices";
import {User} from "../interfaces/User";
import Loading from "../assets/loading/Loading";
import {Link, useNavigate} from "react-router-dom";
import {edit, trash} from "../fontAwesome/Icons";
import {Pagination} from "react-bootstrap";
import DeleteUserModal from "../assets/modals/users/DeleteUserModal";
import {pathes} from "../routes/Routes";
import {useUserContext} from "../context/UserContext";
import {wellcomeMSG, errorMSG} from "../assets/taosyify/Toastify";

const SandBox: FunctionComponent = () => {
	const usersPerPage = 50;
	const {decodedToken} = useToken();
	const {isAdmin} = useUserContext();
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setISLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [userSearch, setUserSearch] = useState<User[] | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const onHide = () => setShowDeleteModal(false);
	const onShow = () => setShowDeleteModal(true);

	// Pagination logic
	const startIndex = (currentPage - 1) * usersPerPage;
	const usersToDisplay = userSearch || users;
	const currentUsers = usersToDisplay.slice(startIndex, startIndex + usersPerPage);

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
				});
		} else {
			navigate(pathes.cards); // redirect if the user is not admin
		}
	}, [isAdmin]);

	// Handle Edit
	const handleEdit = (userId: string) => {
		console.log(`Editing user with id: ${userId}`);
	};

	// Handle Delete
	const handleDelete = (userId: string) => {
		try {
			deleteUserById(userId)
				.then(() => {
					setUsers((prevUsers) =>
						prevUsers.filter((user) => user._id !== userId),
					);
					wellcomeMSG("User deleted successfully.");
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

	// Filtered users based on search term
	const filteredUsers = useMemo(() => {
		const trimmedName = searchTerm.trim().toLowerCase();
		if (trimmedName === "") return null; // Don't display anything if search is empty

		return users.filter((user) => {
			const firstName = user.name.first.toLowerCase();
			const lastName = user.name.last.toLowerCase();
			const phone = user.phone.toLowerCase();

			return (
				firstName.includes(trimmedName) ||
				lastName.includes(trimmedName) ||
				phone.includes(trimmedName)
			);
		});
	}, [searchTerm, users]);


	// Handle Search input change
	const handleSearch = (name: string) => {
		setSearchTerm(name); // Update the search term
	};

	// Update the userSearch whenever filteredUsers change
	useEffect(() => {
		setUserSearch(filteredUsers);
	}, [filteredUsers]);

	// Loading state
	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className='d-flex justify-content-around'>
				<h2 className='text-light'>SandBox</h2>
				<div className='mt-3 mb-3'>
					<form
						className='d-flex me-3'
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<input
							ref={inputRef}
							id='search2'
							name='search2'
							className='form-control me-2 search-input'
							type='search'
							placeholder='Search'
							aria-label='Search'
							onChange={(e) => handleSearch(e.target.value)}
						/>
					</form>
				</div>
			</div>

			{/* Pagination */}
			<div className='container-sm'>
				<Pagination
					className='m-auto w-100 d-flex justify-content-center mb-3 flex-wrap'
					data-bs-theme='dark'
				>
					{[...Array(Math.ceil(usersToDisplay.length / usersPerPage))].map(
						(_, i) => (
							<Pagination.Item
								key={i}
								active={currentPage === i + 1}
								onClick={() => {
									setCurrentPage(i + 1);
								}}
							>
								{i + 1}
							</Pagination.Item>
						),
					)}
				</Pagination>
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
									<strong>Name:</strong> {user.name.first}{" "}
									{user.name.last}
								</p>
								<p>
									<strong>Email:</strong> {user.email}
								</p>
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
							</div>

							{decodedToken?.isAdmin && (
								<>
									<div className='d-flex text-end justify-content-end my-3'>
										<button
											className='text-warning w-25 mx-5'
											onClick={() => handleEdit(user._id as string)}
										>
											{edit}
										</button>
										<DeleteUserModal
											show={showDeleteModal}
											onHide={onHide}
											onDelete={() =>
												handleDelete(user._id as string)
											}
										/>
										<button
											className='text-danger w-25'
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
			) : usersToDisplay.length ? (
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
							{currentUsers.map((user) => (
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
												<button
													className='text-warning'
													onClick={() =>
														handleEdit(user._id as string)
													}
												>
													{edit}
												</button>
											</td>
											<td colSpan={1}>
												<button
													className='text-danger'
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
			) : (
				<p>No users found</p>
			)}
		</>
	);
};

export default SandBox;
