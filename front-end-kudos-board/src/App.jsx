import { useEffect, useState } from "react";
import "./App.css";
import BoardList from "./components/board/board-list";
import CreateModal from "./components/board/create-modal";
import SearchBar from "./components/board/search-bar";
import SortButtons from "./components/board/sort-buttons";
import ChangeTheme from "./components/change-theme";
import { useTheme } from "./hooks/use-theme";

function App() {
	const { colors } = useTheme();
	document.body.style.backgroundColor = colors.background;

	const [boardData, setBoardData] = useState([]);
	const [toggleCreateModal, setToggleCreateModal] = useState(false);

	useEffect(() => {
		(async () => {
			const baseUrl = import.meta.env.VITE_BASE_URL;
			const response = await fetch(`${baseUrl}/board`);
			const data = await response.json();

			setBoardData(data);
		})();
	}, []);

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
					onClick={() => {
						setToggleCreateModal(!toggleCreateModal);
					}}
				>
					Create a New Board
				</button>
				<ChangeTheme />
			</div>

			<main>{boardData && <BoardList boardData={boardData} />}</main>
			{toggleCreateModal && (
				<CreateModal setToggleCreateModal={setToggleCreateModal} />
			)}
		</div>
	);
}

export default App;
