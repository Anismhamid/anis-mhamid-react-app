import {FunctionComponent} from "react";
interface LoadingProps {}
import styless from "./loading.module.css";
const Loading: FunctionComponent<LoadingProps> = () => {
	return (
		<div
			className='d-flex align-items-center justify-content-center flex-column'
			style={{minHeight: "88vh"}}
		>
			<div className={styless.sloader}>
				<span className={styless.loaderText}>Please be patient</span>
				<span className={styless.load}></span>
			</div>
		</div>
	);
};

export default Loading;
