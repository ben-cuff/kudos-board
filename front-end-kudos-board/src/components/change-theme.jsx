import { useTheme } from "../hooks/use-theme";

export default function ChangeTheme() {
	const { colors, toggleTheme, currentTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			style={{
				backgroundColor: colors.secondary,
				border: "none",
				cursor: "pointer",
			}}
		>
			<img
				src={
					currentTheme === "dark"
						? "moon-outline.svg"
						: "sunny-outline.svg"
				}
				width="50px"
				height="50px"
			/>
		</button>
	);
}
