import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiBoard } from "../api/api-board";
import { apiCard } from "../api/api-card";

export default function useCardData() {
	const { boardId } = useParams();
	const [boardData, setBoardData] = useState({});
	const [cardData, setCardData] = useState([]);

	const fetchBoardData = useCallback(async () => {
		try {
			const [dataBoard, dataCard] = await Promise.all([
				apiBoard.getBoard(boardId),
				apiCard.getCards(boardId),
			]);

			setBoardData(dataBoard);
			setCardData(dataCard);
		} catch (error) {
			console.error("Error fetching board and card data:", error);
		}
	}, [boardId]);

	const handleDeleteCard = async (cardId) => {
		await apiCard.deleteCard(boardId, cardId);
		setCardData((prevData) =>
			prevData.filter((card) => card.id !== cardId)
		);
	};

	const handleUpvoteCard = async (cardId) => {
		// this is the intended implementation where you can upvote multiple times
		await apiCard.upvoteCard(boardId, cardId);
		setCardData((prevData) =>
			prevData.map((card) =>
				card.id === cardId
					? { ...card, upvotes: card.upvotes + 1 }
					: card
			)
		);
	};

	const handlePinCard = async (cardId) => {
		await apiCard.pinCard(boardId, cardId);
		fetchBoardData();
	};

	useEffect(() => {
		fetchBoardData();
	}, [fetchBoardData]);

	return {
		boardData,
		cardData,
		fetchBoardData,
		handleDeleteCard,
		handleUpvoteCard,
		handlePinCard,
	};
}
