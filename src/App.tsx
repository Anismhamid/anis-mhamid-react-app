import {BrowserRouter as Router, Routes} from "react-router-dom";
import {routes} from "./routes/Routes";
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify";

function App() {
	return (
		<Router>
			<ToastContainer />
			<Navbar />
			<Routes>
				{routes.login}
				{routes.home}
				{routes.register}
				{routes.about}
			</Routes>
		</Router>
	);
}

export default App;
