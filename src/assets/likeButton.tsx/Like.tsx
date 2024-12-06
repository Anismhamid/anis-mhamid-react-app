import {FunctionComponent, useState, useEffect} from "react";
import styles from "./like.module.css";

interface LikeProps {
	buttonId: string;
	likesLength: number;
	likeColor: {[key: string]: string} | string;
	onClick: () => void;
}

const Like: FunctionComponent<LikeProps> = ({
	buttonId,
	likesLength,
	likeColor,
	onClick,
}) => {
	const [isLiked, setIsLiked] = useState<boolean>(false);

	useEffect(() => {
		const savedLikeStatus = localStorage.getItem(buttonId);
		if (savedLikeStatus === "true") {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [buttonId]);

	const handleLikeToggle = () => {
		setIsLiked((prev) => {
			const newStatus = !prev;
			localStorage.setItem(buttonId, newStatus.toString());
			return newStatus;
		});
		onClick();
	};

	return (
		<div className={styles.likeButton}>
			<input
				onClick={handleLikeToggle}
				className={`${likeColor} ${styles.hiddenCheckbox}`}
				id={buttonId}
				type='checkbox'
				checked={isLiked}
				readOnly
			/>
			<label className={`${styles.like}`} htmlFor={buttonId}>
				<svg
					className={`${styles.likeIcon} ${styles.one}`}
					fill='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z'></path>
				</svg>
				<span className={styles.likeText}>Likes</span>
			</label>
			<span className={`${styles.likeCount} ${styles.one}`}>{likesLength}</span>
			<span className={` ${likeColor} ${styles.likeCount} ${styles.one}`}>
				{likesLength}
			</span>
		</div>
	);
};

export default Like;
