import {FunctionComponent} from "react";
import styless from "./loading.module.css";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
	return (
			<div className={styless.loader}>
				<span className={styless.loaderText}>Loading</span>
				<span className={styless.load}></span>
			</div>
	);
};

export default Loading;
