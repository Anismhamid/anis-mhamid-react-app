import {FunctionComponent, MutableRefObject, useEffect, useRef, useState} from "react";
import useToken from "../customHooks/useToken";
import {getAllUsers} from "../services/userServices";
import {User} from "../interfaces/User";
import Loading from "../assets/loading/Loading";
import {Link} from "react-router-dom";
import {edit, trash} from "../fontAwesome/Icons";
import {Pagination} from "react-bootstrap";

const SandBox: FunctionComponent = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [isLoading, setISLoading] = useState(true);
	const [users, setUsers] = useState<User[]>([]);
	const {afterDecode} = useToken();
	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 50;

	useEffect(() => {
		if (afterDecode?.isAdmin) {
			getAllUsers()
				.then((res) => {
					setUsers(res);
					setISLoading(false);
				})
				.catch(console.log);
		}
	}, [afterDecode]);

	if (isLoading) return <Loading />;

	// Pagination logic
	const startIndex = (currentPage - 1) * usersPerPage;
	const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

	const handleEdit = (userId: string) => {
		console.log(`Editing user with id: ${userId}`);
	};

	const handleDelete = (userId: string) => {
		setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
	};

	const handleSearch = (userId: string) => {
		const seatchResult =users.find((user) => user._id === userId);
		console.log(seatchResult);
		
	};

	return (
		<>
			<div className=' d-flex justify-content-around'>
				<h1 className='text-light'>SandBox</h1>
				{/* <form
					className='d-flex me-3 w-25'
					onSubmit={(e) => {
						e.preventDefault();
					}}
				> */}
				<input
					ref={inputRef}
					id='search2'
					name='search2'
					className='form-control me-2 search-input'
					type='search2'
					placeholder='Search2'
					aria-label='Search2'
					onChange={()=>handleSearch("653a608d1c7cd80c1fd27532")}
				/>
				{/* <button className='btn btn-outline-light' type='submit'>
						Search
					</button>
				</form> */}
			</div>
			<div className='table-responsive'>
				<table className='table table-striped table-dark'>
					<thead>
						<tr>
							<th>Full Name</th>
							<th>Email</th>
							<th>Image</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{currentUsers.length ? (
							currentUsers.map((user) => (
								<tr key={user._id}>
									<td>
										{user.name.first} {user.name.last}
									</td>
									<td>{user.email}</td>
									<td>
										<Link to={`/userDetails/${user._id}`}>
											<img
												className='img-fluid'
												src={
													user.image?.imageUrl ||
													"/avatar-design.png"
												}
												alt={`${user.name.first}'s profile`}
												style={{
													width: "50px",
													height: "50px",
													borderRadius: "50%",
												}}
											/>
										</Link>
									</td>
									{afterDecode.isAdmin && (
										<>
											<td>
												<button className='btn text-warning'>
													{edit}
												</button>
											</td>
											<td>
												<button
													className='btn text-danger'
													onClick={() => handleDelete}
												>
													{trash}
												</button>
											</td>
										</>
									)}
								</tr>
							))
						) : (
							<tr>
								<td colSpan={12} className='text-center'>
									No Data Available
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<div className='container-sm'>
					<Pagination className='m-auto w-100 d-flex justify-content-center mb-3 flex-wrap'>
						{[...Array(Math.ceil(users.length / usersPerPage))].map(
							(_, i) => (
								<Pagination.Item
									key={i}
									active={currentPage === i + 1}
									onClick={() => setCurrentPage(i + 1)}
								>
									{i + 1}
								</Pagination.Item>
							),
						)}
					</Pagination>
				</div>
			</div>
		</>
	);
};

export default SandBox;
