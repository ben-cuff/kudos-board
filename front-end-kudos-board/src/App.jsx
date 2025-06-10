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
	const [categoryInput, setCategoryInput] = useState("All");

	document.body.style.backgroundColor = colors.background;

	useEffect(() => {
		fetchBoardData();
	}, []);

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
	}, [categoryInput]);

	async function fetchBoardsByCategory(category) {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_BASE_URL
				}/board?category=${category.toUpperCase()}`
			);
			const data = await response.json();
			setBoardData(data);
		} catch (error) {
			console.error("Failed to fetch boards by category:", error);
		}
	}

	async function fetchBoardData() {
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/board`);
		const data = await response.json();

		setBoardData(data);
	}

	const handleDeleteBoard = async (boardId) => {
		await fetch(`${import.meta.env.VITE_BASE_URL}/board/${boardId}`, {
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

		await fetch(`${import.meta.env.VITE_BASE_URL}/board`, {
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
