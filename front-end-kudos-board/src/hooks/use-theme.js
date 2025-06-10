import { useContext } from "react";
import { ThemeContext } from "../context/theme-content";

export const useTheme = () => {
	const context = useContext(ThemeContext);
	return context;
};
