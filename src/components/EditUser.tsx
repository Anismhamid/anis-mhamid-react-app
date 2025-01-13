import {useState, useEffect, FunctionComponent, useContext, SetStateAction} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {putUserData, getUserById} from "../services/userServices";
import Loading from "./Loading";
import {errorMSG, successMSG} from "../atoms/taosyify/Toastify";
import {User} from "../interfaces/User";
import {FormikValues, useFormik} from "formik";
import CardsInput from "../atoms/modals/CardsInput";
import {SiteTheme} from "../theme/theme";
import Button from "../atoms/buttons/Button";
import DeleteModal from "../atoms/modals/DeleteModal";
import {ButtonToolbar, OverlayTrigger} from "react-bootstrap";
import {tooltips} from "../atoms/ToolTip";
import {handleDelete_User} from "../handleFunctions/users";
import {updateUserFormikSchema} from "../fomikFormsValidation/UpdateFormikValues";

interface EditUserProps {}

const EditUser: FunctionComponent<EditUserProps> = () => {
	const [isLoading, setIsLoading] = useState(true);
	const {userId} = useParams<string>();
	const theme = useContext(SiteTheme);
	const navigate = useNavigate();

	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<SetStateAction<string>>("");
	const [user, setUser] = useState<any>({
		name: {first: "", middle: "", last: ""},
		phone: "",
		email: "",
		password: "",
		address: {state: "", city: "", country: "", street: "", houseNumber: 0, zip: 0},
		image: {url: "", alt: ""},
	});

	const onShowDeleteCardModal = () => setShowDeleteModal(true);
	const onHideDeleteCardModal = () => setShowDeleteModal(false);

	const UpdateUserFormik: FormikValues = useFormik<any>({
		enableReinitialize: true,
		initialValues: {
			name: {
				first: user.name.first,
				middle: user.name.middle,
				last: user.name.last,
			},
			phone: user.phone,
			image: {url: user.image.url, alt: user.image.alt},
			address: {
				state: user.address.state,
				country: user.address.country,
				city: user.address.city,
				street: user.address.street,
				houseNumber: user.address.houseNumber,
				zip: user.address.zip,
			},
		},
		validationSchema: updateUserFormikSchema,
		onSubmit: (values: User) => {
			putUserData(user._id as string, values).then(() => {
				setUser((prevUser: User) =>
					prevUser._id === user._id ? {...prevUser, ...values} : prevUser,
				);
				successMSG(`${user.name.first} has ben Updated successfuly`);
			});
		},
	});

	useEffect(() => {
		if (!userId) return;

		setIsLoading(true);
		getUserById(userId)
			.then((data: User) => {
				setUser(data);
				setIsLoading(false);
			})
			.catch((err) => {
				setUser((prev: User) => prev);
				console.log(err);
				setIsLoading(false);
				errorMSG("Error fetching user details");
			});
	}, [userId]);

	if (isLoading) return <Loading />;

	return (
		<main style={{backgroundColor: theme.background, color: theme.color}}>
			<h6 className='lead display-5 p-3 fw-bold'>User Details</h6>
			<hr />
			<Button text={"Back"} path={() => navigate(-1)} />
			<hr className=' w-25' />
			<div className='container'>
				<div className='row mp-5 fw-bold lead'>
					<div className='col-12'>
						<p className='fs-1 lead mt-5 w-25'>
							{user.isBusiness ? "Business" : "Client"}
						</p>
						<img
							style={{maxWidth: "55px"}}
							src={user.isAdmin ? "/admin.png" : "/user.png"}
							alt={user.isAdmin ? "/admin icon" : "/user icon"}
						/>
						<p className='lead w-25 fw-bold text-success'>
							{user.isAdmin ? "Admin" : "Client"}
						</p>
					</div>
					<div className='col-12'>
						<img
							src={user.image.url}
							alt={user.image.alt}
							className=' img-fluid rounded-5 my-4'
							style={{maxWidth: "20rem"}}
						/>
					</div>
					<div className='col-12'>
						<p className=' lead '>
							{user.name.first} {user.name.last}
						</p>
					</div>
					<div className='col-12'>
						<p className='-emphasis'>{user.email}</p>
					</div>
					<div className='col-12'>
						<p className=' lead'>
							{user.address.country} , {user.address.city}
						</p>
					</div>
					<div className=' border p-2 bg-light d-flex align-items-center justify-content-around'>
						<button
							onClick={() => {
								onShowDeleteCardModal();
								setCardToDelete(user._id as string);
							}}
							className='btn btn-outline-danger fw-bold'
						>
							DELETE ACCOUNT
						</button>
						<ButtonToolbar>
							<OverlayTrigger placement='top' overlay={tooltips.soon}>
								<button
									onClick={() => {}}
									className='btn btn-outline-secondary fw-bold'
								>
									FREEZE ACCOUNT
								</button>
							</OverlayTrigger>
						</ButtonToolbar>
					</div>
				</div>
				<h6 className=' lead display-6 mt-3'>Edit User</h6>
				<hr className='mt-3' />
				<form
					onSubmit={UpdateUserFormik.handleSubmit}
					className=' border shadow-lg p-4 rounded-3'
					data-bs-theme='dark'
				>
					{/* First and Middle Name */}
					<div className='row mb-3'>
						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"name.first"}
								type={"text"}
								value={UpdateUserFormik.values.name.first}
								error={UpdateUserFormik.errors.name?.first}
								touched={UpdateUserFormik.touched.name?.first}
								placeholder={"First name"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>

						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"name.middle"}
								type={"text"}
								value={UpdateUserFormik.values.name.middle}
								error={UpdateUserFormik.errors.name?.middle}
								touched={UpdateUserFormik.touched.name?.middle}
								placeholder={"Middle Name"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>
					</div>
					{/* Last Name and Phone */}
					<div className='row mb-3'>
						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"name.last"}
								type={"text"}
								value={UpdateUserFormik.values.name.last}
								error={UpdateUserFormik.errors.name?.last}
								touched={UpdateUserFormik.touched.name?.last}
								placeholder={"Last name"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>

						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"phone-no"}
								type={"tel"}
								value={UpdateUserFormik.values.phone}
								error={UpdateUserFormik.errors.phone}
								touched={UpdateUserFormik.touched.phone}
								placeholder={"Phone"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>
					</div>

					{/* Image URL and Alt Text */}
					<div className='row mb-3'>
						<div className='col-md-6 col-sm-12'>
							<div className='form-floating mb-3'>
								<input
									type={"url"}
									id={"image"}
									name={"image.url"}
									value={UpdateUserFormik.values.image.url}
									placeholder={"Image URL"}
									className={`form-control`}
									onChange={UpdateUserFormik.handleChange}
									onBlur={UpdateUserFormik.handleBlur}
									aria-label={"url"}
								/>
								<label
									htmlFor={"image"}
									className='form-label fw-bold text-secondary'
								>
									{"Image Url"}
								</label>
							</div>
						</div>

						<div className='col-md-6 col-sm-12'>
							<div className='form-floating mb-3'>
								<input
									type={"text"}
									id={"image.alt"}
									name={"image.alt"}
									value={UpdateUserFormik.values.image.alt}
									placeholder={"Image URL"}
									className={`form-control`}
									onChange={UpdateUserFormik.handleChange}
									onBlur={UpdateUserFormik.handleBlur}
									aria-label={"imageAlt"}
								/>
								<label
									htmlFor={"image.alt"}
									className='form-label fw-bold text-secondary'
								>
									{"Image Alt text"}
								</label>
							</div>
						</div>
					</div>

					{/* Address fields */}
					<div className='row mb-3'>
						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"address.state"}
								type={"text"}
								value={UpdateUserFormik.values.address.state}
								error={UpdateUserFormik.errors.address?.state}
								touched={UpdateUserFormik.touched.address?.state}
								placeholder={"State"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>

						<div className='col-md-6 col-sm-12'>
							<CardsInput
								name={"address.country"}
								type={"text"}
								value={UpdateUserFormik.values.address.country}
								error={UpdateUserFormik.errors.address?.country}
								touched={UpdateUserFormik.touched.address?.country}
								placeholder={"Country"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>
					</div>
					<div className='row mt-3'>
						<div className='col-md-6 col-sm-12 mt-2'>
							<CardsInput
								name={"address.city"}
								type={"text"}
								value={UpdateUserFormik.values.address.city}
								error={UpdateUserFormik.errors.address?.city}
								touched={UpdateUserFormik.touched.address?.city}
								placeholder={"City"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>
						<div className='col-md-6 col-sm-12 mt-2'>
							<CardsInput
								name={"address.street"}
								type={"text"}
								value={UpdateUserFormik.values.address.street}
								error={UpdateUserFormik.errors.address?.street}
								touched={UpdateUserFormik.touched.address?.street}
								placeholder={"Street"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>
					</div>
					{/* House number and Zip */}
					<div className='row mt-3'>
						<div className='col-md-6 col-sm-12 mt-2'>
							<CardsInput
								name={"address.houseNumber"}
								type={"number"}
								value={UpdateUserFormik.values.address.houseNumber}
								error={UpdateUserFormik.errors.address?.houseNumber}
								touched={UpdateUserFormik.touched.address?.houseNumber}
								placeholder={"House number"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>
						<div className='col-md-6 col-sm-12 mt-2'>
							<CardsInput
								name={"address.zip"}
								type={"number"}
								value={UpdateUserFormik.values.address.zip}
								error={UpdateUserFormik.errors.address?.zip}
								touched={UpdateUserFormik.touched.address?.zip}
								placeholder={"Zip code"}
								onChange={UpdateUserFormik.handleChange}
								onBlur={UpdateUserFormik.handleBlur}
							/>
						</div>
					</div>
					{/* Submit Button */}
					<button
						type='submit'
						className='btn btn-success w-100 py-2 mt-3'
						disabled={!UpdateUserFormik.dirty || !UpdateUserFormik.isValid}
					>
						Update
					</button>
				</form>
			</div>
			<DeleteModal
				method='Delete'
				toDelete='Are you sure you want to Delete This Account? this Account will be permanently removed. This action cannot be undone.'
				render={() => onHideDeleteCardModal()}
				show={showDeleteModal}
				onHide={() => onHideDeleteCardModal()}
				onDelete={() => {
					handleDelete_User(cardToDelete as string);
				}}
				navigateTo={""}
			/>
		</main>
	);
};

export default EditUser;
