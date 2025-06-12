import { Gif, Grid } from "@giphy/react-components";
import propTypes from "prop-types";
import useCreateCard from "../../hooks/use-create-card";
import "./create-card-form.css";

export default function CreateCardForm({
	handleSubmitCreateModal,
	setSelectedGif,
}) {
	const {
		searchTerm,
		setSearchTerm,
		selectedGifData,
		setSelectedGifData,
		fetchGifs,
	} = useCreateCard();
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
			{searchTerm && !selectedGifData && (
				<div className="grid-container">
					<Grid
						width={200}
						columns={3}
						onGifClick={(gif) => {
							setSelectedGif(gif.id);
							setSelectedGifData(gif);
						}}
						fetchGifs={fetchGifs}
						key={searchTerm}
						noLink={true}
					/>
				</div>
			)}
			{selectedGifData && (
				<div className="selected-gif-container">
					<Gif gif={selectedGifData} width={200} noLink={true} />
					<button
						type="button"
						className="reset-gif-btn"
						onClick={() => {
							setSelectedGifData(null);
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
	handleSubmitCreateModal: propTypes.func.isRequired,
	setSelectedGif: propTypes.func.isRequired,
};
