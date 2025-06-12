import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiCard } from "./api/apiCard";
import "./card-page.css";
import CreateTheme from "./components/board/create-theme";
import CardHeader from "./components/card/card-header";
import CardList from "./components/card/card-list";
import CreateCardModal from "./components/card/create-card-modal";
import useCardData from "./hooks/use-card-data";
import { useTheme } from "./hooks/use-theme";

export default function CardPage() {
	const { boardId } = useParams();

	const {
		boardData,
		cardData,
		fetchBoardData,
		handleDeleteCard,
		handleUpvoteCard,
		handlePinCard,
	} = useCardData(boardId);

	const [toggleCreateModal, setToggleCreateModal] = useState(false);
	const [selectedGif, setSelectedGif] = useState("");

	const navigate = useNavigate();
	const { colors } = useTheme();

	document.body.style.backgroundColor = colors.background;

	const handleSubmitCreateModal = useCallback(
		async (e) => {
			e.preventDefault();
			const message = e.target.message.value;
			const author = e.target.author.value || "";
			const gif = selectedGif || "";

			await apiCard.createCard(boardId, { message, gif, author });
			e.target.reset();
			await fetchBoardData();
			setToggleCreateModal(false);
		},
		[boardId, selectedGif, fetchBoardData]
	);

	return (
		<div className="container">
			<CardHeader />
			<CreateTheme
				setToggleCreateModal={setToggleCreateModal}
				toggleCreateModal={toggleCreateModal}
			/>
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
		</div>
	);
}
