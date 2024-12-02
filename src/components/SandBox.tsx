import {FunctionComponent, useEffect, useState} from "react";
import useToken from "../customHooks/useToken";
import {getAllUsers} from "../services/userServices";
import {User} from "../interfaces/User";
import Loading from "../assets/loading/Loading";
import {Link} from "react-router-dom";
import {edit, trash} from "../fontAwesome/Icons";

interface SandBoxProps {}

const SandBox: FunctionComponent<SandBoxProps> = () => {
	const [isLoading, setISLoading] = useState<boolean>(true);
	const [users, setUsers] = useState<User[]>([]);
	const {afterDecode} = useToken();

	const handleEdit = (userId: string) => {
		console.log(`Editing user with id: ${userId}`);
	};

	const handleDelete = (userId: string) => {
		console.log(`Deleting user with id: ${userId}`);
	};

	useEffect(() => {
		if (afterDecode && afterDecode._id && afterDecode.isAdmin === true) {
			getAllUsers()
				.then((res) => {
					setUsers(res);
					setISLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [afterDecode, handleDelete, handleEdit]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<h1 className='text-light'>SandBox</h1>
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
						{users.length ? (
							users.map((user) => (
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
													user.img?.imageUrl ||
													"/avatar-design.png"
												}
												alt={
													user.img?.alt ||
													`${user.name.first}'s profile`
												}
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
												<button
													className='btn text-warning'
													onClick={() => handleEdit(user._id)}
												>
													{edit}
												</button>
											</td>
											<td>
												<button
													className='btn text-danger'
													onClick={() => handleDelete(user._id)}
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
								<td colSpan={5} className='text-center'>
									No Data Available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default SandBox;
