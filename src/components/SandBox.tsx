import {FunctionComponent, useEffect, useRef, useState} from "react";
import useToken from "../customHooks/useToken";
import {deleteUserById, getAllUsers} from "../services/userServices";
import {User} from "../interfaces/User";
import Loading from "../assets/loading/Loading";
import {Link} from "react-router-dom";
import {edit, trash} from "../fontAwesome/Icons";
import {Pagination} from "react-bootstrap";

const SandBox: FunctionComponent = () => {
	const usersPerPage = 50;
	const {decodedToken} = useToken();
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setISLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [userSearch, setUserSearch] = useState<User[] | null>(null);

	// Pagination logic based on search or full user list
	const startIndex = (currentPage - 1) * usersPerPage;
	const usersToDisplay = userSearch || users;
	const currentUsers = usersToDisplay.slice(startIndex, startIndex + usersPerPage);

	useEffect(() => {
		if (decodedToken?.isAdmin) {
			getAllUsers()
				.then((res) => {
					setUsers(res);
					setISLoading(false);
				})
				.catch(console.log);
		}
	}, [decodedToken]);

	if (isLoading) return <Loading />;

	const handleEdit = (userId: string) => {
		console.log(`Editing user with id: ${userId}`);
	};

	const handleDelete = (userId: string) => {
		deleteUserById(userId).then(() =>
			setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)),
		);
	};

	const handleSearch = (name: string) => {
		const trimmedName = name.trim().toLowerCase();

		if (trimmedName === "") {
			setUserSearch(null); // Clear the user list if no search query
		} else {
			const searchResult = users.filter((user) => {
				const firstName = user.name.first.toLowerCase();
				const lastName = user.name.last.toLowerCase();
				const phone = user.phone.toLowerCase();

				return (
					firstName.includes(trimmedName) ||
					lastName.includes(trimmedName) ||
					phone.includes(trimmedName)
				);
			});

			setUserSearch(searchResult.length > 0 ? searchResult : null);
		}
	};

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		window.scrollTo(0, 0);
	};

	const totalUsersToDisplay = usersToDisplay.length;

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

			{/* Display the user result or all users */}
			{userSearch && userSearch.length > 0 ? (
				<div className='user-found card text-bg-light min-vh-100'>
					<h3>User Found:</h3>
					{userSearch.map((user) => (
						<div className='card' key={user._id}>
							<p>
								<strong>Name:</strong> {user.name.first} {user.name.last}
							</p>
							<p>
								<strong>Email:</strong> {user.email}
							</p>
							<img
								className='img-fluid'
								src={user.image?.imageUrl || "/avatar-design.png"}
								alt={user.name.first}
								style={{
									width: "100px",
									height: "100px",
									borderRadius: "50%",
								}}
							/>
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
													user.image?.imageUrl ||
													"/avatar-design.png"
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
									{decodedToken.isAdmin && (
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
													onClick={() =>
														handleDelete(user._id as string)
													}
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
										handlePageChange(i + 1);
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
