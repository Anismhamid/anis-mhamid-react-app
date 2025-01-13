import {FunctionComponent, useContext} from "react";
import {SiteTheme} from "../../theme/theme";

interface ButtonProps {
	text: string;
	path:Function
}

const Button: FunctionComponent<ButtonProps> = ({text,path}) => {
	const theme = useContext(SiteTheme);

	return (
		<div
			className={`text-start mb-5 rounded rounded-bottom-3 border-end border-3 border-bottom`}
			style={{width: "7rem"}}
		>
			<button
				onClick={() => path()}
				style={{backgroundColor: theme.background, color: theme.color}}
				className='w-100'
			>
				<span className='fs-5 next-back-home fw-bold'>{text}</span>
			</button>
		</div>
	);
};

export default Button;
