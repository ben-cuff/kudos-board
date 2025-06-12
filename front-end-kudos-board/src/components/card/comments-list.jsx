import propTypes from "prop-types";
import "./comments-list.css";

export default function CommentsList({ comments, colors }) {
	return (
		<div className="comments-container">
			{comments.length > 0 ? (
				comments.map((comment) => (
					<div key={comment.id} style={{ color: colors.primary }}>
						<p style={{ color: colors.primary }}>
							{comment.message}
						</p>
						<p style={{ color: colors.primary }}>
							- {comment.author || "anonymous"}
						</p>
					</div>
				))
			) : (
				<p style={{ color: colors.primary }}>No comments yet.</p>
			)}
		</div>
	);
}

CommentsList.propTypes = {
	comments: propTypes.arrayOf(propTypes.object).isRequired,
	colors: propTypes.shape({
		primary: propTypes.string.isRequired,
	}).isRequired,
};
