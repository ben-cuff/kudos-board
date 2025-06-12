import { useCallback, useEffect, useState } from "react";
import { apiCard } from "../api/apiCard";

export default function useComments(card) {
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState([]);

	const fetchComments = useCallback(async () => {
		const data = await apiCard.getComments(card.boardId, card.id);
		setComments(data);
	}, [card]);

	const handleSubmitComment = useCallback(
		async (e) => {
			e.preventDefault();

			apiCard.addComment(card.boardId, card.id, {
				message: newComment,
				author: e.target.author.value,
			});

			fetchComments();
			setNewComment("");
		},
		[card.boardId, card.id, fetchComments, newComment]
	);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	return {
		newComment,
		setNewComment,
		comments,
		setComments,
		handleSubmitComment,
		fetchComments,
	};
}
