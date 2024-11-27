import {Route} from "react-router-dom";
import Home from "../components/Cards";
import Login from "../components/Login";
import Register from "../components/Register";
import FavCards from "../components/FavCards";
import About from "../components/About";

export const routes = {
	home: <Route path='/' element={<Home />} />,
	login: <Route path='/login' element={<Login />} />,
	register: <Route path='/register' element={<Register />} />,
	favCards: <Route path='/fav-cards' element={<FavCards />} />,
	about: <Route path='/about' element={<About />} />,
};

export const pathes = {
	home: "/",
	register: "/register",
	login: "/login",
	about: "/about",
	favCards: "/fav-cards",
};
