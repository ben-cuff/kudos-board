import { createContext, useState } from "react";

const colorThemes = {
	light: {
		primary: "#101010",
		secondary: "#7f7f7f",
		background: "#efefef",
		card: "lightgray",
		border: "#303030",
		button: "#0D98BA",
	},
	dark: {
		primary: "#efefef",
		secondary: "#7f7f7f",
		background: "#101010",
		card: "darkgray",
		border: "#b0b0b0",
		button: "#0D98BA",
	},
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		const nextTheme = theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
	};

	const colors = theme === "dark" ? colorThemes.dark : colorThemes.light;

	const value = {
		colors,
		currentTheme: theme,
		toggleTheme,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export { ThemeContext };
