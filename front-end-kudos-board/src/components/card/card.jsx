import propTypes from "prop-types";
import { useNavigate } from "react-router";

export default function Card({ board, card, handleDeleteCard }) {
	const navigate = useNavigate();
	return (
		<div className="card">
			<img src={card.image} alt={card.title} className="card-image" />
			<h2 className="card-title">{card.title}</h2>
			<h3 className="card-category">{card.category}</h3>
			<div className="btns-container">
				<button onClick={() => navigate(`/${card.id}`)}>
					View Card
				</button>
				<button onClick={() => handleDeleteCard(card.id)}>
					Delete Card
				</button>
			</div>
		</div>
	);
}

Card.propTypes = {
	board: propTypes.object.isRequired,
	card: propTypes.object.isRequired,
	handleDeleteCard: propTypes.func.isRequired,
};
