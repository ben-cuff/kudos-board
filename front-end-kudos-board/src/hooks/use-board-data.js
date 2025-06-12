import { useCallback, useEffect, useState } from "react";
import { apiBoard } from "../api/apiBoard";

export function useBoardData() {
	const [boardData, setBoardData] = useState([]);

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
