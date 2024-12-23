import {useNavigate} from "react-router-dom";
import {errorMSG, infoMSG} from "../atoms/taosyify/Toastify";
import {deleteUserById} from "../services/userServices";
import {pathes} from "../routes/Routes";

// EditUser handle Delete
export const handleDelete_User = (userId: string) => {
	const navigate = useNavigate();

	try {
		deleteUserById(userId)
			.then(() => {
				navigate(pathes.sandBox);
				infoMSG("User deleted successfully.");
			})
			.catch(() => {
				errorMSG("Error deleting user.");
			});
	} catch (error) {
		errorMSG("Failed to delete user.");
	}
};
