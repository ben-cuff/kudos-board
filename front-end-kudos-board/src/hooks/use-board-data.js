import { useCallback, useEffect, useState } from "react";
import { apiBoard } from "../api/api-board";

export default function useBoardData() {
	const [boardData, setBoardData] = useState([]);

	const fetchBoardData = useCallback(async () => {
		const data = await apiBoard.getBoards();
		setBoardData(data);
	}, []);

	const handleSubmitCreateModal = useCallback(
		async (title, category, author, image) => {
			await apiBoard.addBoard(title, category, author, image);
			await fetchBoardData();
		},
		[fetchBoardData]
	);

	const handleDeleteBoard = useCallback(async (boardId) => {
		await apiBoard.deleteBoard(boardId);
		setBoardData((prevData) =>
			prevData.filter((board) => board.id !== boardId)
		);
	}, []);

	useEffect(() => {
		fetchBoardData();
	}, [fetchBoardData]);

	return {
		boardData,
		setBoardData,
		fetchBoardData,
		handleSubmitCreateModal,
		handleDeleteBoard,
	};
}
