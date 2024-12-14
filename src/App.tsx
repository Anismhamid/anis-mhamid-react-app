import {BrowserRouter as Router, Routes} from "react-router-dom";
import {routes} from "./routes/Routes";
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {SiteTheme, theme} from "./theme/theme";

function App() {
	const [darkMode, setDarkMode] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem("darkMode");
		return savedTheme ? JSON.parse(savedTheme) : false;
	});

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);

	const handleTheme = () => {
		setDarkMode((prev) => !prev);
	};

	return (
		<SiteTheme.Provider value={darkMode ? theme.dark : theme.light}>
			<Router>
				<ToastContainer />
				<Navbar
					darkSetter={() => {
						handleTheme();
					}}
				/>
				<Routes>
					{routes.login}
					{routes.cards}
					{routes.register}
					{routes.about}
					{routes.favCards}
					{routes.myCards}
					{routes.sandBox}
					{routes.userDetails}
					{routes.profile}
				</Routes>
			</Router>
		</SiteTheme.Provider>
	);
}

export default App;
