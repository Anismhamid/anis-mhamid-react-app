import {FunctionComponent} from "react";
interface LoadingProps {}
import './loading.css'
const Loading: FunctionComponent<LoadingProps> = () => {
	return (
		<div className=" d-flex align-items-center justify-content-center flex-column" style={{minHeight:"88vh"}}>
			<div className='loader'>
				<span className='loader-text'>loading</span>
				<span className='load'></span>
			</div></div>
	);
};

export default Loading;
