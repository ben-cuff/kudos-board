import { useEffect, useState } from "react";
import "./App.css";
import BoardList from "./components/board/board-list";
import CreateModal from "./components/board/create-modal";
import CreateTheme from "./components/board/create-theme";
import SearchBar from "./components/board/search-bar";
import SortButtons from "./components/board/sort-buttons";
import { useBoardData } from "./hooks/use-board-data";
import { useBoardFilters } from "./hooks/use-board-filters";
import { useTheme } from "./hooks/use-theme";

function App() {
	const { colors } = useTheme();
	const {
		boardData,
		fetchBoardData,
		handleSubmitCreateModal,
		handleDeleteBoard,
		setBoardData,
	} = useBoardData();

	const {
		categoryInput,
		setCategoryInput,
		setSearchInput,
		handleSearchSubmit,
	} = useBoardFilters(fetchBoardData, boardData, setBoardData);

	const [toggleCreateModal, setToggleCreateModal] = useState(false);

	document.body.style.backgroundColor = colors.background;

	useEffect(() => {
		fetchBoardData();
	}, [fetchBoardData]);

	return (
		<div className="container">
			<header className="header-container">
				<h1 style={{ color: colors.primary }}>👏Kudos Board👏</h1>
			</header>
			<SearchBar
				setSearchInput={setSearchInput}
				handleSearchSubmit={handleSearchSubmit}
			/>
			<SortButtons
				categoryInput={categoryInput}
				setCategoryInput={setCategoryInput}
			/>
			<CreateTheme
				setToggleCreateModal={setToggleCreateModal}
				toggleCreateModal={toggleCreateModal}
			/>
			<main>
				{boardData && (
					<BoardList
						boardData={boardData}
						handleDeleteBoard={handleDeleteBoard}
					/>
				)}
			</main>
			<footer
				className="footer"
				style={{
					background: colors.background,
					color: colors.primary,
					borderTop: `1px solid ${colors.primary}`,
				}}
			>
				© 2025 Kudos
			</footer>
			{toggleCreateModal && (
				<CreateModal
					setToggleCreateModal={setToggleCreateModal}
					handleSubmitCreateModal={handleSubmitCreateModal}
				/>
			)}
		</div>
	);
}

export default App;
