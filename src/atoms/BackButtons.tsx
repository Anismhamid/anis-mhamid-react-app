import {FunctionComponent, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {SiteTheme} from "../theme/theme";
import {leftArrow, leftRight} from "../fontAwesome/Icons";

interface BackBottonsProps {}

const BackBsotton: FunctionComponent<BackBottonsProps> = () => {
	const navigate = useNavigate();
	const theme = useContext(SiteTheme);

	return (
		<div className='d-flex justify-content-around'>
			<button
				style={{backgroundColor: theme.background, color: theme.color}}
				className=' bg-transparent border-0'
				onClick={() => navigate(-1)}
			>
				<span className=' m-5 fs-2'>{leftArrow}</span>
			</button>
			<button
				style={{backgroundColor: theme.background, color: theme.color}}
				className=' bg-transparent border-0'
				onClick={() => navigate(-1)}
			>
				<span className=' m-5 fs-2'>{leftRight}</span>
			</button>
		</div>
	);
};

export default BackBsotton;
