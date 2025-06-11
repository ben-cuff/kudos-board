import propTypes from "prop-types";
import { useTheme } from "../../hooks/use-theme";
import "./create-card-modal.css";

export default function CreateCardModal({
	setToggleCreateModal,
	handleSubmitCreateModal,
}) {
	const { colors } = useTheme();
	return (
		<div className="overlay-style">
			<div
				className="modal-style"
				style={{ background: colors.background }}
			>
				<h2>Create New Card</h2>
				<form onSubmit={handleSubmitCreateModal}>
					<input
						type="text"
						id="card-message"
						name="message"
						required
						placeholder="message"
					/>
					<input
						type="text"
						id="card-author"
						name="author"
						placeholder="author (optional)"
					/>
					<input
						type="text"
						id="card-gif"
						name="gif"
						required
						placeholder="gif from giphy"
					/>
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

CreateCardModal.propTypes = {
	setToggleCreateModal: propTypes.func.isRequired,
	handleSubmitCreateModal: propTypes.func.isRequired,
};
