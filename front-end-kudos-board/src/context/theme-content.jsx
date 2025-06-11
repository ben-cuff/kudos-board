import { createContext, useState } from "react";

const colorThemes = {
	light: {
		primary: "#202020",
		secondary: "#8f8f8f",
		background: "#f5f5f5",
		card: "#e0e0e0",
		border: "#404040",
		button: "#25a5c4",
	},
	dark: {
		primary: "#f5f5f5",
		secondary: "#8f8f8f",
		background: "#202020",
		card: "#909090",
		border: "#c0c0c0",
		button: "#25a5c4",
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
