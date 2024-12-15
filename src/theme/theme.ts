import { createContext } from "react";

export const theme = {
	light: {background: "rgb(239, 246, 255)", color: "#212529"},
	dark: {
		background: "#212529",
		color: "rgb(255, 255, 255)",
	},
};

export const SiteTheme = createContext(theme.light);

