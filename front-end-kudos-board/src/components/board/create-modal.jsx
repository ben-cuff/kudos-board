import propTypes from "prop-types";
import { useTheme } from "../../hooks/use-theme";
import "./create-modal.css";

export default function CreateModal({ setToggleCreateModal }) {
	const { colors } = useTheme();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const category = e.target.category.value;
		const author = e.target.author.value || "";
		const image = e.target.image.value || "";
		const baseUrl = import.meta.env.VITE_BASE_URL;

		await fetch(`${baseUrl}/board`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, category, author, image }),
		});

		e.target.reset();
		setToggleCreateModal(false);
	};

	return (
		<div className="overlay-style">
			<div className="modal-style" style={{background: colors.background}}>
				<h2>Create New Board</h2>
				<form onSubmit={handleSubmit}>
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

CreateModal.propTypes = { setToggleCreateModal: propTypes.func.isRequired };
