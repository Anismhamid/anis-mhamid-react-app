import {BrowserRouter as Router, Routes} from "react-router-dom";
import {routes} from "./routes/Routes";
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify";
import {createContext, useState} from "react";

const theme = {
	light: {background: "rgb(239, 246, 255)", color: "rgb(0, 0, 0)"},
	dark: {
		background: "rgb(22, 21, 21)",
		color: "rgb(255, 255, 255)",
	},
};

export const SiteTheme = createContext(theme.light);

function App() {
	const [darkMode, setDarkMode] = useState<boolean>(false);

	return (
		<SiteTheme.Provider value={darkMode ? theme.dark : theme.light}>
			<Router>
				<ToastContainer />
				<Navbar darkSetter={() => setDarkMode(!darkMode)} />
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
