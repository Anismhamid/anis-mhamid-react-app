import {toast} from "react-toastify";

export function successMSG(msg: string): void {
	toast.success(msg, {
		position: "top-center",
		autoClose: 3000,
		pauseOnHover: true,
		hideProgressBar: false,
		theme: "dark",
	});
}
export function errorMSG(msg: string): void {
	toast.error(msg, {
		position: "top-center",
		autoClose: 3000,
		pauseOnHover: true,
		hideProgressBar: false,
		theme: "dark",
	});
}
