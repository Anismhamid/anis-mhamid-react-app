import {
	FunctionComponent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {deleteUserById, getAllUsers} from "../services/userServices";
import {User} from "../interfaces/User";
import {Link, useNavigate} from "react-router-dom";
import {edit, trash} from "../fontAwesome/Icons";
import {Pagination} from "react-bootstrap";
import {useUserContext} from "../context/UserContext";
import useToken from "../hooks/useToken";
import {errorMSG, infoMSG} from "../atoms/taosyify/Toastify";
import Loading from "./Loading";
import {SiteTheme} from "../theme/theme";
import Button from "../atoms/buttons/Button";
import {pathes} from "../routes/Routes";
import DeleteModal from "../atoms/modals/DeleteModal";

interface SandBoxProps {}

const SandBox: FunctionComponent<SandBoxProps> = () => {
	const usersPerPage = 50;
	const {decodedToken} = useToken();
	const {isAdmin} = useUserContext();
	const [users, setUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setISLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [userSearch, setUserSearch] = useState<User[] | null>(null);
	const [selectedUserId, setSelectedUserId] = useState<string>("");
	const [render, setRender] = useState<boolean>(false);
	const onHide = () => setShowDeleteModal(false);
	const onShow = () => setShowDeleteModal(true);
	const theme = useContext(SiteTheme);
	const navigate = useNavigate();

	// Pagination logic
	const startIndex = (currentPage - 1) * usersPerPage;

	const filteredUsers = useMemo(() => {
		const query = searchTerm.trim().toLowerCase();
		if (!query) return users;
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
	}, [searchTerm, users]);

	const usersToDisplay = useMemo(() => {
		if (userSearch && searchTerm) {
			return userSearch;
		}
		return users;
	}, [userSearch, users, searchTerm]);

	const currentUsers = useMemo(() => {
		return usersToDisplay.slice(startIndex, startIndex + usersPerPage);
	}, [usersToDisplay, startIndex]);

	useEffect(() => {
		getAllUsers(currentPage, usersPerPage)
			.then((res) => {
				setUsers(res);
			})
			.catch(() => {
				errorMSG("Error fetching users.");
			})
			.finally(() => setISLoading(false));
	}, []);

	const refresh = () => setRender(!render);

	const handleEdit = useCallback((userId: string) => {
		setSelectedUserId(userId);
	}, []);

	const handleDelete = useCallback(
		(userId: string) => {
			try {
				deleteUserById(userId)
					.then((res) => {
						setUsers((prevUsers: User[]) =>
							prevUsers.filter((user) => user._id !== res._id),
						);
						infoMSG("User deleted successfully.");
					})
					.catch(() => {
						errorMSG("Error deleting user.");
					});
			} catch (error) {
				errorMSG("Failed to delete user.");
			}
		},
		[currentPage, usersPerPage],
	);

	const handleSearch = useCallback((name: string) => {
		setSearchTerm(name);
		setCurrentPage(1);
	}, []);

	// Loading state
	if (isLoading) return <Loading />;

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<div className='row w-100'>
				<div className='col-md-4 col-lg-3'>
					<h6
						style={{backgroundColor: theme.background}}
						className='inset-shadow lead display-5 p-3 fw-bold  rounded-end-pill'
					>
						SandBox
					</h6>
				</div>
			</div>

			<hr />
			<Button text={"Home"} path={() => navigate(pathes.cards)} />
			{/* Pagination */}
			<div className='container-sm'>
				<Pagination className='m-auto w-100 d-flex justify-content-center mb-3 flex-wrap'>
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
			<div className='d-flex justify-content-around'>
				<div className='mt-3 mb-3'>
					<form className='d-flex me-3' onSubmit={(e) => e.preventDefault()}>
						<input
							id='search-user'
							name='search-user'
							className='form-control me-2 search-input'
							type='search'
							placeholder='name/email/Phone'
							aria-label='search-user'
							onChange={(e) => {
								handleSearch(e.target.value);
								setUserSearch(filteredUsers);
							}}
						/>
					</form>
				</div>
			</div>
			{!searchTerm && (
				<div className='table-responsive'>
					<table
						style={{backgroundColor: theme.background, color: theme.color}}
						className='table table-striped'
					>
						<thead>
							<tr>
								<th colSpan={3}>Image</th>
								<th colSpan={3}>email</th>
								<th colSpan={4}>Full Name</th>
								<th colSpan={1}>Edit</th>
								<th colSpan={1}>Delete</th>
							</tr>
						</thead>
						<tbody>
							{currentUsers.map((user: User) => (
								<tr key={user._id}>
									<td colSpan={3}>
										<Link to={`/userDetails/${user._id}`}>
											<img
												className='img-fluid mx-5 rounded-5'
												src={
													user.image.url || "/avatar-design.png"
												}
												alt={`${user.image?.alt}'s profile`}
												style={{
													width: "70px",
													height: "70px",
												}}
											/>
										</Link>
									</td>
									<td colSpan={3}>
										{user.name.first} {user.name.last}
									</td>
									<td colSpan={4}>{user.email}</td>

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
												<button
													className='text-danger '
													onClick={() => {
														onShow();
														setSelectedUserId(
															user._id as string,
														);
													}}
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
				</div>
			)}
			{/* Displaying the user result or all users */}
			{userSearch && searchTerm && (
				<div
					style={{backgroundColor: theme.background, color: theme.color}}
					className='user-found card my-3 min-vh-100'
				>
					<h3>Users Found</h3>
					{userSearch.map((user) => (
						<div
							style={{
								backgroundColor: theme.background,
								color: theme.color,
							}}
							className='card  fw-bold'
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

							{isAdmin && (
								<>
									<div className='d-flex text-end justify-content-end my-3'>
										<Link to={`/userDetails/${user._id}`}>
											<button
												className='text-warning mx-5'
												onClick={() => {
													handleEdit(user._id as string);
												}}
											>
												{edit}
											</button>
										</Link>

										<button
											className='text-danger'
											onClick={() => {
												onShow();
												setSelectedUserId(user._id as string);
											}}
										>
											{trash}
										</button>
									</div>
								</>
							)}
						</div>
					))}
				</div>
			)}
			<DeleteModal
				method='Delete'
				toDelete='Are you sure you want to Delete This User? this User will be permanently removed. This action cannot be undone.'
				render={() => refresh()}
				show={showDeleteModal}
				onHide={() => onHide()}
				onDelete={() => handleDelete(selectedUserId)}
				navigateTo={""}
			/>
		</main>
	);
};

export default SandBox;
