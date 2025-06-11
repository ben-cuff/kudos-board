import propTypes from "prop-types";

export default function Card({ card, handleDeleteCard }) {
	return (
		<div className="card">
			<img src={card.gif} alt={card.message} className="card-gif" />
			<h2 className="card-title">{card.message}</h2>
			<div className="btns-container">
				<button>Upvotes: {card.upvotes}</button>
				<button>View Comments</button>
				<button onClick={() => handleDeleteCard(card.id)}>
					Delete Card
				</button>
			</div>
		</div>
	);
}

Card.propTypes = {
	card: propTypes.object.isRequired,
	handleDeleteCard: propTypes.func.isRequired,
};
