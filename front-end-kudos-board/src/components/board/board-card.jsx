import propTypes from "prop-types";
import { useNavigate } from "react-router";
import "./board-card.css";

export default function BoardCard({ board, handleDeleteBoard }) {
	const navigate = useNavigate();
	return (
		<div className="board-card">
			<img src={board.image} alt={board.title} className="board-image" />
			<h2 className="board-title">{board.title}</h2>
			<h3 className="board-category">{board.category}</h3>
			<div className="btns-container">
				<button onClick={() => navigate(`/${board.id}`)}>
					View Board
				</button>
				<button onClick={() => handleDeleteBoard(board.id)}>
					Delete Board
				</button>
			</div>
		</div>
	);
}

BoardCard.propTypes = {
	board: propTypes.object.isRequired,
	handleDeleteBoard: propTypes.func.isRequired,
};
