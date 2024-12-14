import { createContext } from "react";

export const theme = {
	light: {background: "rgb(239, 246, 255)", color: "rgb(56, 56, 56)"},
	dark: {
		background: "rgb(22, 22, 22)",
		color: "rgb(255, 255, 255)",
	},
};

export const SiteTheme = createContext(theme.light);

