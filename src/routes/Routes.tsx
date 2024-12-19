import {Route} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import FavCards from "../components/FavCards";
import About from "../components/About";
import Profile from "../components/Profile";
import Cards from "../components/Cards";
import SandBox from "../components/SandBox";
import MyCards from "../components/MyCards";
import UserDetails from "../components/EditUser";
import CardDetails from "../components/CardDeatails";
import PageNotFound from "../components/PageNotFound";

export const routes = {
	cards: <Route path='/' element={<Cards />} />,
	login: <Route path='/login' element={<Login />} />,
	register: <Route path='/register' element={<Register />} />,
	favCards: <Route path='/fav-cards' element={<FavCards />} />,
	about: <Route path='/about' element={<About />} />,
	sandBox: <Route path='/sandBox' element={<SandBox />} />,
	myCards: <Route path='/myCards' element={<MyCards />} />,
	profile: <Route path='/profile' element={<Profile />} />,
	userDetails: <Route path='/userDetails/:userId' element={<UserDetails />} />,
	cardDetails: <Route path='/cardDetails/:cardId' element={<CardDetails />} />,
	pageNotFound: <Route path='*' element={<PageNotFound />} />,
};

export enum pathes {
	cards = "/",
	register = "/register",
	login = "/login",
	about = "/about",
	favCards = "/fav-cards",
	sandBox = "/sandBox",
	myCards = "/myCards",
	profile = "/profile",
	userDetails = "/userDetails/:userId",
	cardDetails = "/cardDetails/:cardId",
	pageNotFound = "*",
}
