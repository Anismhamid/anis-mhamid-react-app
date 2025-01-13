import {FunctionComponent, useContext} from "react";
import {SiteTheme} from "../theme/theme";
import {Link} from "react-router-dom";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
	const theme = useContext(SiteTheme);

	return (
		<>
			<main style={{backgroundColor: theme.background, color: theme.color}}>
				<header className='row w-100'>
					<div className='col-md-6 col-lg-3'>
						<h6
							style={{backgroundColor: theme.background}}
							className='display-4 text-primary'>About bCards
						</h6>
					</div>
				</header>
				<hr />
				<div className='container'>
					<section>
						<p className='lead'>
							Welcome to <strong>bCards</strong>, your go-to solution for
							digital business cards.
						</p>
						<p className='lead'>
							<mark className=' fw-bold'>Our mission</mark> is to make
							networking easier and more efficient with an intuitive,
							eco-friendly, and digital approach to exchanging business
							information.
						</p>
						<p className=' lead'>
							Whether you're an entrepreneur, freelancer, or part of a
							corporate team, <strong>bCards </strong> enables you to
							create, share, and manage your digital business card from
							anywhere, at any time. With features like customizable
							designs, one-click sharing, and secure cloud storage, it's
							never been easier to keep your professional identity at your
							fingertips.
						</p>

						<h2 className='mt-5'>Key Features</h2>
						<ul className='list-group py-5 lead'>
							<li className='list-group-item'>
								Customizable templates for your business card design.
							</li>
							<li className='list-group-item my-3 p-4'>
								Instant sharing via QR code or direct link.
							</li>
							<li className='list-group-item'>
								Secure cloud storage for easy access and updates.
							</li>
							<li className='list-group-item my-3 p-4'>
								Integration with social media profiles and websites.
							</li>
							<li className='list-group-item'>
								Eco-friendly alternative to traditional paper cards.
							</li>
						</ul>

						<h2 className='mt-5'>Our Vision</h2>
						<p className=' lead'>
							At <strong>bCards</strong>, we envision a world where
							networking is effortless, paper waste is reduced, and every
							professional can share their contact details instantly, no
							matter where they are. Join us in creating a smarter, greener
							future.
						</p>
					</section>
				</div>
			</main>
			<footer className='text-center pb-5 border-top border-info w-100'>
				<h2 className='mt-5'>Contact Us</h2>
				<p className=' lead'>
					Have questions or want to learn more? Feel free to reach out to us at
				</p>
				<Link to='mailto:support@bcards.com' className='text-primary'>
					support@bcards.com
				</Link>
				<p className=' pb-5'>&copy; 2024 bCards. All Rights Reserved.</p>
			</footer>
		</>
	);
};

export default About;
