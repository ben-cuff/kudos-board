import { useCallback, useEffect, useState } from "react";
import { apiCard } from "../api/apiCard";

export default function useComments() {
	const [boardId, setBoardId] = useState(null);
	const [cardId, setCardId] = useState(null);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState([]);

	const fetchComments = useCallback(async () => {
		if (!boardId || !cardId) return;
		const data = await apiCard.getComments(boardId, cardId);
		setComments(data);
	}, [boardId, cardId]);

	const handleSubmitComment = useCallback(
		async (e) => {
			e.preventDefault();
			if (!boardId || !cardId) return;

			await apiCard.addComment(boardId, cardId, {
				message: newComment,
				author: e.target.author.value,
			});

			fetchComments();
			setNewComment("");
		},
		[boardId, cardId, fetchComments, newComment]
	);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	return {
		boardId,
		setBoardId,
		cardId,
		setCardId,
		newComment,
		setNewComment,
		comments,
		setComments,
		handleSubmitComment,
		fetchComments,
	};
}
