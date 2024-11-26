import {Route} from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import FavCards from "../components/FavCards";
import About from "../components/About";
import Guests from "../components/Guests";

export const routes = {
	guests: <Route path='/' element={<Guests />} />,
	login: <Route path='/login' element={<Login />} />,
	home: <Route path='/home' element={<Home />} />,
	register: <Route path='/register' element={<Register />} />,
	favCards: <Route path='/fav-cards' element={<FavCards />} />,
	about: <Route path='/about' element={<About />} />,
};

export const pathes = {
	guests: "/",
	register: "/register",
	login: "/login",
	home: "/home",
	about: "/about",
	favCards: "/fav-cards",
};
