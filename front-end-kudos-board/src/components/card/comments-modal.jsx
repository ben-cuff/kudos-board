import { Gif } from "@giphy/react-components";
import propTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import "./comments-modal.css";

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
				<div className="header-from-gif">
					<div className="modal-header">
						<h3
							style={{
								color: colors.primary,
							}}
						>
							{card.message}
						</h3>
						<button
							className="close-btn"
							onClick={() => setToggleCommentsModal(false)}
						>
							×
						</button>
					</div>
					<div>
						{gifData ? (
							<Gif gif={gifData} width={200} noLink={true} />
						) : (
							<img src="https://picsum.photos/200" />
						)}
						{card.author ? (
							<p style={{ color: colors.primary }}>
								From: {card.author}
							</p>
						) : (
							<p style={{ color: colors.primary }}>
								From: anonymous
							</p>
						)}
					</div>
				</div>
				<div>
					<h3 style={{ color: colors.primary, textAlign: "center" }}>
						Comments
					</h3>
					<div className="comments-container">
						{comments.length > 0 ? (
							comments.map((comment) => (
								<div
									key={comment.id}
									style={{ color: colors.primary }}
								>
									<p style={{ color: colors.primary }}>
										{comment.message}
									</p>
									<p style={{ color: colors.primary }}>
										- {comment.author || "anonymous"}
									</p>
								</div>
							))
						) : (
							<p style={{ color: colors.primary }}>
								No comments yet.
							</p>
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
