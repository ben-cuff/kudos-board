import propTypes from "prop-types";
import { useTheme } from "../../hooks/use-theme";
import "./create-modal.css";

export default function CreateModal({
	setToggleCreateModal,
	handleSubmitCreateModal,
	handleDeleteBoard,
}) {
	const { colors } = useTheme();

	return (
		<div className="overlay-style">
			<div
				className="modal-style"
				style={{ background: colors.background }}
			>
				<h2>Create New Board</h2>
				<form onSubmit={handleSubmitCreateModal}>
					<input
						type="text"
						id="board-title"
						name="title"
						required
						placeholder="title"
					/>
					<input
						type="text"
						id="board-author"
						name="author"
						placeholder="author (optional)"
					/>
					<input
						type="text"
						id="board-image"
						name="image"
						placeholder="image URL"
					/>
					<select id="board-category" name="category" required>
						<option value="">Select a category</option>
						<option value="CELEBRATION">Celebration</option>
						<option value="THANK_YOU">Thank you</option>
						<option value="INSPIRATION">Inspiration</option>
					</select>
					<button type="submit">Create Board</button>
				</form>
				<button
					className="close-btn"
					onClick={() => {
						setToggleCreateModal(false);
					}}
				>
					Close
				</button>
			</div>
		</div>
	);
}

CreateModal.propTypes = {
	setToggleCreateModal: propTypes.func.isRequired,
	handleSubmitCreateModal: propTypes.func.isRequired,
	handleDeleteBoard: propTypes.func.isRequired,
};
