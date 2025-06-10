import "./App.css";
import useTheme from "./hooks/useTheme";

function App() {
	const { colors } = useTheme();
	document.body.style.backgroundColor = colors.background;
	return (
		<div
			className="background"
			style={{ backgroundColor: colors.background }}
		></div>
	);
}

export default App;
