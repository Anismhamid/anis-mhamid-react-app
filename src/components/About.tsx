import {FunctionComponent} from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
	return (
		<div className='container py-5'>
			<header className='text-center mb-4'>
				<h1 className='display-4 text-primary'>About bCards</h1>
			</header>

			<section className='text-light'>
				<p className='lead'>
					Welcome to <strong>bCards</strong>, your go-to solution for digital
					business cards.
				</p>
				<p>
					Our mission is to make networking easier and more efficient with an
					intuitive, eco-friendly, and digital approach to exchanging business
					information.
				</p>
				<p>
					Whether you're an entrepreneur, freelancer, or part of a corporate
					team, bCards enables you to create, share, and manage your digital
					business card from anywhere, at any time. With features like
					customizable designs, one-click sharing, and secure cloud storage,
					it's never been easier to keep your professional identity at your
					fingertips.
				</p>

				<h2 className='mt-5'>Key Features</h2>
				<ul className='list-group py-5'>
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
				<p>
					At bCards, we envision a world where networking is effortless, paper
					waste is reduced, and every professional can share their contact
					details instantly, no matter where they are. Join us in creating a
					smarter, greener future.
				</p>
			</section>

			<footer className='text-center mt-5 py-3 text-light border-top w-100'>
				<h2 className='mt-5'>Contact Us</h2>
				<p>
					Have questions or want to learn more? Feel free to reach out to us at{" "}
					<a href='mailto:support@bcards.com' className='text-primary'>
						support@bcards.com
					</a>
					.
				</p>
				<p>&copy; {new Date().getFullYear()} bCards. All Rights Reserved.</p>
			</footer>
		</div>
	);
};

export default About;
