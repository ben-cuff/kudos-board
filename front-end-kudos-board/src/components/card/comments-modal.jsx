import { Gif } from "@giphy/react-components";
import propTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";

export default function CommentsModal({
	gifData,
	setToggleCommentsModal,
	card,
}) {
	const { colors } = useTheme();
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState([]);

	const fetchComments = useCallback(async () => {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_URL}/board/${card.boardId}/card/${
				card.id
			}/comment`
		);
		const data = await response.json();
		console.log(data);
		setComments(data);
	}, [card]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	const handleSubmitComment = async (e) => {
		e.preventDefault();

		await fetch(
			`${import.meta.env.VITE_BASE_URL}/board/${card.boardId}/card/${
				card.id
			}/comment`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: newComment,
					author: e.target.author.value,
				}),
			}
		);
		fetchComments();
		setNewComment("");
	};

	return (
		<div className="overlay-style">
			<div
				className="modal-style"
				style={{ background: colors.background }}
			>
				<div>
					<h2>Comments</h2>
					<button onClick={() => setToggleCommentsModal(false)}>
						×
					</button>
				</div>

				<div>
					<p>{card.message}</p>
					{gifData ? (
						<Gif gif={gifData} width={200} noLink={true} />
					) : (
						<img src="https://picsum.photos/200" />
					)}
					{card.author && <p>From: {card.author}</p>}
				</div>

				<div>
					<h3>Comments</h3>
					<div>
						{comments.length > 0 ? (
							comments.map((comment) => (
								<div key={comment.id}>
									<p>{comment.message}</p>
									{comment.author && (
										<p>- {comment.author}</p>
									)}
								</div>
							))
						) : (
							<p>No comments yet.</p>
						)}
					</div>

					<form onSubmit={handleSubmitComment}>
						<div>
							<textarea
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="Add a comment..."
								rows={3}
								required
							/>
							<input
								name="author"
								placeholder="author (optional)"
								id="author"
							/>
							<button type="submit">Add Comment</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

CommentsModal.propTypes = {
	gifData: propTypes.object,
	setToggleCommentsModal: propTypes.func.isRequired,
	card: propTypes.object.isRequired,
};
