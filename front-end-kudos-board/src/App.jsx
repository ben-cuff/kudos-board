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
	const [boardData, setBoardData] = useState([]);
	const [toggleCreateModal, setToggleCreateModal] = useState(false);

	document.body.style.backgroundColor = colors.background;
	const baseUrl = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		fetchBoardData();
	}, []);

	async function fetchBoardData() {
		const baseUrl = import.meta.env.VITE_BASE_URL;
		const response = await fetch(`${baseUrl}/board`);
		const data = await response.json();

		setBoardData(data);
	}

	const handleDeleteBoard = async (boardId) => {
		await fetch(`${baseUrl}/board/${boardId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		setBoardData((prevData) =>
			prevData.filter((board) => board.id !== boardId)
		);
	};

	const handleSubmitCreateModal = async (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const category = e.target.category.value;
		const author = e.target.author.value || "";
		const image = e.target.image.value || "";

		await fetch(`${baseUrl}/board`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, category, author, image }),
		});

		e.target.reset();
		await fetchBoardData();
		setToggleCreateModal(false);
	};

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

			<main>
				{boardData && (
					<BoardList
						boardData={boardData}
						handleDeleteBoard={handleDeleteBoard}
					/>
				)}
			</main>
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
