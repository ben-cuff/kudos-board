import "./App.css";
import SearchBar from "./components/board/search-bar";
import SortButtons from "./components/board/sort-buttons";
import ChangeTheme from "./components/change-theme";
import { useTheme } from "./hooks/use-theme";

function App() {
	const { colors } = useTheme();
	document.body.style.backgroundColor = colors.background;
	return (
		<div className="container">
			<header className="header-container">
				<h1 style={{ color: colors.primary }}>👏Kudos Board👏</h1>
			</header>
			<SearchBar />
			<SortButtons />
			<div className="create-theme-container">
				<button
					className="create-btn"
					style={{
						background: colors.button,
						color: colors.background,
					}}
				>
					Create a New Board
				</button>
				<ChangeTheme />
			</div>
		</div>
	);
}

export default App;
