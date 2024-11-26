import {BrowserRouter as Router, Routes} from "react-router-dom";
import { routes} from "./routes/Routes";
import Navbar from "./components/Navbar";

function App() {
	return (
		<Router>
			<Navbar/>
			<Routes>
				{routes.guests}
				{routes.login}
				{routes.home}
				{routes.register}
				{routes.about}
			</Routes>
		</Router>
	);
}

export default App;
