// from https://dev.to/rushi-patel/usetheme-custom-hook-maintain-standard-theme-throughout-the-app-df

import { useState } from "react";

const colorThemes = {
	light: {
		primary: "#101010",
		secondary: "#7f7f7f",
		background: "#efefef",
		border: "#303030",
	},
	dark: {
		primary: "#efefef",
		secondary: "#7f7f7f",
		background: "#101010",
		border: "#b0b0b0",
	},
};

export default function useTheme() {
	const [theme, setTheme] = useState("dark");

	const toggleTheme = () => {
		const nextTheme = theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
	};

	const colors = theme === "dark" ? colorThemes.dark : colorThemes.light;

	return { colors, currentTheme: theme, toggleTheme };
}
