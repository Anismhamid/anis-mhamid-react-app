import {Bounce, toast} from "react-toastify";

export function successMSG(msg: string): void {
	toast.success(msg, {
		position: "top-center",
		autoClose: 3000,
		pauseOnHover: true,
		hideProgressBar: true,
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
export function wellcomeMSG(msg: string): void {
	toast(msg, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Bounce,
	});
}
