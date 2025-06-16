import { useContext } from "react";
import { ThemeContext } from "../context/theme-content";

const useTheme = () => {
	const context = useContext(ThemeContext);
	return context;
};

export default useTheme;
