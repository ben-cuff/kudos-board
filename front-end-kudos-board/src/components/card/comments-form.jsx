import propTypes from "prop-types";
import "./comments-form.css";

export default function CommentsForm({
	newComment,
	setNewComment,
	handleSubmitComment,
}) {
	return (
		<form onSubmit={handleSubmitComment}>
			<textarea
				value={newComment}
				onChange={(e) => setNewComment(e.target.value)}
				placeholder="Add a comment..."
				rows={3}
				required
			/>
			<input name="author" placeholder="author (optional)" id="author" />
			<button type="submit">Add Comment</button>
		</form>
	);
}

CommentsForm.propTypes = {
	newComment: propTypes.string.isRequired,
	setNewComment: propTypes.func.isRequired,
	handleSubmitComment: propTypes.func.isRequired,
};
