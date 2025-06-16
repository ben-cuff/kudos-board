import useTheme from "../hooks/use-theme";
import "./change-theme.css";

export default function ChangeTheme() {
	const { colors, toggleTheme, currentTheme } = useTheme();

	return (
		<div className="btn-container">
			<button
				onClick={toggleTheme}
				style={{
					backgroundColor: colors.secondary,
				}}
				className="theme-btn"
			>
				<img
					src={
						currentTheme === "dark"
							? "moon-outline.svg"
							: "sunny-outline.svg"
					}
					width="25px"
					height="25px"
				/>
			</button>
		</div>
	);
}
