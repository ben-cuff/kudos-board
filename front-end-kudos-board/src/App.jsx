import "./App.css";
import SearchBar from "./components/board/search-bar";
import SortButtons from "./components/board/sort-buttons";
import useTheme from "./hooks/useTheme";

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
		</div>
	);
}

export default App;
