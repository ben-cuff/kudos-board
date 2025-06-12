import { Gif, Grid } from "@giphy/react-components";
import PropTypes from "prop-types";
import useCreateCard from "../../hooks/use-create-card";
import "./create-card-form.css";

export default function CreateCardForm({
	handleSubmitCreateModal,
	setSelectedGif,
}) {
	const { searchTerm, setSearchTerm, gifData, setGifData, fetchGifs } =
		useCreateCard();
	return (
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
				<div className="grid-container">
					<Grid
						width={200}
						columns={3}
						onGifClick={(gif) => {
							setSelectedGif(gif.id);
							setGifData(gif);
						}}
						fetchGifs={fetchGifs}
						key={searchTerm}
						noLink={true}
					/>
				</div>
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
	);
}

CreateCardForm.propTypes = {
	handleSubmitCreateModal: PropTypes.func.isRequired,
	setSearchTerm: PropTypes.func.isRequired,
	searchTerm: PropTypes.string,
	gifData: PropTypes.object,
	setSelectedGif: PropTypes.func.isRequired,
	setGifData: PropTypes.func.isRequired,
	fetchGifs: PropTypes.func.isRequired,
};
