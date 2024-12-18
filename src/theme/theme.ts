import { createContext } from "react";

export const theme = {
	light: {background: "#ECF8F8", color: "#2d373f"},
	dark: {
		background: "#2d373f",
		color: "#ECF8F8",
	},
};

export const SiteTheme = createContext(theme.light);

