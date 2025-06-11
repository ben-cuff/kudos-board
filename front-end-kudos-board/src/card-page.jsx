import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./card-page.css";
import CardList from "./components/card/card-list";
import CreateCardModal from "./components/card/create-card-modal";
import ChangeTheme from "./components/change-theme";
import { useTheme } from "./hooks/use-theme";

export default function CardPage() {
	const [boardData, setBoardData] = useState({});
	const [cardData, setCardData] = useState([]);
	const [toggleCreateModal, setToggleCreateModal] = useState(false);
	const [selectedGif, setSelectedGif] = useState("");

	const navigate = useNavigate();
	const { boardId } = useParams();
	const { colors } = useTheme();

	document.body.style.backgroundColor = colors.background;

	const fetchBoardData = useCallback(async () => {
		try {
			const [responseBoard, responseCard] = await Promise.all([
				fetch(`${import.meta.env.VITE_BASE_URL}/board/${boardId}`),
				fetch(`${import.meta.env.VITE_BASE_URL}/board/${boardId}/card`),
			]);

			const [dataBoard, dataCard] = await Promise.all([
				responseBoard.json(),
				responseCard.json(),
			]);

			setBoardData(dataBoard);
			setCardData(dataCard);
		} catch (error) {
			console.error("Error fetching board data:", error);
		}
	}, [boardId]);

	useEffect(() => {
		fetchBoardData();
	}, [fetchBoardData]);

	const handleDeleteCard = async (cardId) => {
		await fetch(
			`${import.meta.env.VITE_BASE_URL}/board/${boardId}/card/${cardId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		setCardData((prevData) =>
			prevData.filter((card) => card.id !== cardId)
		);
	};

	const handleUpvoteCard = async (cardId) => {
		// this is the intended implementation where you can upvote multiple times
		await fetch(
			`${import.meta.env.VITE_BASE_URL}/board/${boardId}/card/${cardId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					operation: "upvote",
				}),
			}
		);
		setCardData((prevData) =>
			prevData.map((card) =>
				card.id === cardId
					? { ...card, upvotes: card.upvotes + 1 }
					: card
			)
		);
	};

	const handlePinCard = async (cardId) => {
		await fetch(
			`${
				import.meta.env.VITE_BASE_URL
			}/board/${boardId}/card/${cardId}/pin`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		fetchBoardData();
	};

	const handleSubmitCreateModal = async (e) => {
		e.preventDefault();
		const message = e.target.message.value;
		const author = e.target.author.value || "";
		const gif = selectedGif || "";

		await fetch(`${import.meta.env.VITE_BASE_URL}/board/${boardId}/card`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message, gif, author }),
		});

		e.target.reset();
		await fetchBoardData();
		setToggleCreateModal(false);
	};

	return (
		<div className="container">
			<header className="header-container">
				<button
					className="back-button"
					style={{
						color: colors.primary,
					}}
					onClick={() => navigate(-1)}
				>
					←
				</button>
				<h1 style={{ color: colors.primary }}>👏Kudos Board👏</h1>
			</header>
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
					Create a New Card
				</button>
				<ChangeTheme />
			</div>
			<h3 style={{ color: colors.primary }}>{boardData.title}</h3>
			<main>
				<CardList
					cardData={cardData}
					handleDeleteCard={handleDeleteCard}
					handleUpvoteCard={handleUpvoteCard}
					handlePinCard={handlePinCard}
				/>
			</main>
			{toggleCreateModal && (
				<CreateCardModal
					setToggleCreateModal={setToggleCreateModal}
					handleSubmitCreateModal={handleSubmitCreateModal}
					setSelectedGif={setSelectedGif}
				/>
			)}
		</div>
	);
}
