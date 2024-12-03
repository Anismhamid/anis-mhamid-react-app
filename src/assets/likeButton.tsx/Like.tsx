import {FunctionComponent} from "react";
import styles from "./like.module.css";

interface LikeProps {}

const Like: FunctionComponent<LikeProps> = () => {
	return (
		<>
			<label className={styles.uiLike}>
				<input type='checkbox' />
				<div className={styles.like}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill=''>
						<g strokeWidth='0' id='SVGRepo_bgCarrier'></g>
						<g
							strokeLinejoin='round'
							strokeLinecap='round'
							id='SVGRepo_tracerCarrier'
						></g>
						<g id='SVGRepo_iconCarrier'>
							<path d='M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z'></path>
						</g>
					</svg>
				</div>
			</label>
		</>
	);
};

export default Like;
