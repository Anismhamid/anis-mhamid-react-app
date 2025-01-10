import {BrowserRouter as Router, Routes} from "react-router-dom";
import {routes} from "./routes/Routes";
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {SiteTheme, theme} from "./theme/theme";
import React from "react";
import Sidebar from "./components/Sidebar";

function App() {
	const [darkMode, setDarkMode] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem("darkMode");
		return savedTheme ? JSON.parse(savedTheme) : false;
	});
    console.log(
		"%cWelcome to Bcards!\n%cReact components are the bee's knees! 😄",
		"font-size:1.5em;color:#4558c9;",
		"color:#d61a7f;font-size:1em;",
	);
	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));

		}, [darkMode]);

	const handleTheme = () => {
		setDarkMode((oldprev) => !oldprev);
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
					<Sidebar />
					<Routes>
						{Object.entries(routes).map(([key, route]) => (
							<React.Fragment key={key}>{route}</React.Fragment>
						))}
					</Routes>
				</Router>
			</SiteTheme.Provider>
	);
}

export default App;
