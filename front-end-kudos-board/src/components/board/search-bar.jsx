import { useTheme } from "../../hooks/use-theme";
import "./search-bar.css";

export default function SearchBar() {
	const { colors } = useTheme();
	return (
		<form className="form-container">
			<input placeholder="Search boards..." className="search-input" />
			<button
				className="search-btn"
				type="submit"
				style={{ background: colors.button, color: colors.background }}
			>
				Search
			</button>
			<button
				type="button"
				className="search-btn"
				style={{ background: colors.button, color: colors.background }}
			>
				Clear
			</button>
		</form>
	);
}
