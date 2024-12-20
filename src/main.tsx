import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import {UserProvider} from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
			<UserProvider>
				<App />
			</UserProvider>
);
