import { Gif, Grid } from "@giphy/react-components";
import propTypes from "prop-types";
import useCreateCard from "../../hooks/use-create-card";
import { useTheme } from "../../hooks/use-theme";
import "./create-card-modal.css";

export default function CreateCardModal({
	setToggleCreateModal,
	handleSubmitCreateModal,
	setSelectedGif,
}) {
	const { colors } = useTheme();
	const { searchTerm, setSearchTerm, gifData, setGifData, fetchGifs } =
		useCreateCard();

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
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="gif from giphy"
					/>
					{searchTerm && !gifData && (
						<Grid
							width={300}
							columns={4}
							onGifClick={(gif) => {
								setSelectedGif(gif.id);
								setGifData(gif);
							}}
							fetchGifs={fetchGifs}
							key={searchTerm}
							noLink={true}
						/>
					)}
					{gifData && (
						<div className="selected-gif-container">
							<Gif gif={gifData} width={200} noLink={true} />
							<button
								type="button"
								className="reset-gif-btn"
								onClick={() => {
									setGifData(null);
									setSelectedGif("");
								}}
							>
								Reset GIF
							</button>
						</div>
					)}
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
	selectedGif: propTypes.string.isRequired,
	setSelectedGif: propTypes.func.isRequired,
};
