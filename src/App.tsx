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
				{routes.cards}
				{routes.register}
				{routes.about}
				{routes.favCards}
				{routes.myCards}
				{routes.sandBox}
				{routes.profile}
			</Routes>
		</Router>
	);
}

export default App;
