import propTypes from "prop-types";
import useTheme from "../../hooks/use-theme";
import CreateCardForm from "./create-card-form";
import "./create-card-modal.css";

export default function CreateCardModal({
	setToggleCreateModal,
	handleSubmitCreateModal,
	setSelectedGif,
}) {
	const { colors } = useTheme();

	return (
		<div className="overlay-style">
			<div
				className="modal-style"
				style={{ background: colors.background, color: colors.primary }}
			>
				<h2>Create New Card</h2>
				<CreateCardForm
					handleSubmitCreateModal={(e) => {
						e.preventDefault();
						handleSubmitCreateModal(
							e.target.message.value,
							e.target.author.value || ""
						);
						e.target.reset();
					}}
					setSelectedGif={setSelectedGif}
				/>
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
	selectedGif: propTypes.string.isRequired,
	setSelectedGif: propTypes.func.isRequired,
};
