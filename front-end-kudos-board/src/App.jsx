import { useCallback, useEffect, useState } from "react";
import { apiBoard } from "./api/apiBoard";
import "./App.css";
import BoardList from "./components/board/board-list";
import CreateModal from "./components/board/create-modal";
import SearchBar from "./components/board/search-bar";
import SortButtons from "./components/board/sort-buttons";
import ChangeTheme from "./components/change-theme";
import { useTheme } from "./hooks/use-theme";

function App() {
	const { colors } = useTheme();
	const [boardData, setBoardData] = useState([]);
	const [toggleCreateModal, setToggleCreateModal] = useState(false);
	const [categoryInput, setCategoryInput] = useState("All");
	const [searchInput, setSearchInput] = useState("");

	document.body.style.backgroundColor = colors.background;

	const fetchBoardData = useCallback(async () => {
		const data = await apiBoard.getBoard();

		setBoardData(data);
	}, []);

	const handleSubmitCreateModal = useCallback(
		async (e) => {
			e.preventDefault();
			const title = e.target.title.value;
			const category = e.target.category.value;
			const author = e.target.author.value || "";
			const image = e.target.image.value || "";

			await apiBoard.addBoard(title, category, author, image);

			e.target.reset();
			await fetchBoardData();
			setToggleCreateModal(false);
		},
		[fetchBoardData]
	);

	const handleSearchSubmit = useCallback(async () => {
		setCategoryInput("All");

		const data = await apiBoard.searchBoard(searchInput);

		setBoardData(data);
	}, [searchInput]);

	const handleDeleteBoard = useCallback(async (boardId) => {
		await apiBoard.deleteBoard(boardId);
		setBoardData((prevData) =>
			prevData.filter((board) => board.id !== boardId)
		);
	}, []);

	useEffect(() => {
		fetchBoardData();
	}, [fetchBoardData]);

	useEffect(() => {
		if (categoryInput === "All") {
			fetchBoardData();
		} else if (categoryInput === "Recent") {
			setBoardData((prevData) =>
				[...prevData]
					.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
					)
					.slice(0, 6)
			);
		} else {
			(async () => {
				await fetchBoardsByCategory(categoryInput);
			})();
		}
	}, [categoryInput, fetchBoardData]);

	useEffect(() => {
		if (searchInput == "") fetchBoardData();
	}, [searchInput, fetchBoardData]);

	async function fetchBoardsByCategory(category) {
		try {
			const data = await apiBoard.getCategoryBoard(category);
			setBoardData(data);
		} catch (error) {
			console.error("Failed to fetch boards by category:", error);
		}
	}

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
