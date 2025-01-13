import {FunctionComponent, useContext} from "react";
import styless from "../loading.module.css";
import {SiteTheme} from "../theme/theme";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
	const theme = useContext(SiteTheme);

	return (
		<main style={{backgroundColor: theme.background}}>
			<div className={styless.container}>
				<div className={styless.loader}>
					<span className={styless.loaderText}>Loading</span>
					<span className={styless.load}></span>
				</div>
			</div>
		</main>
	);
};

export default Loading;
