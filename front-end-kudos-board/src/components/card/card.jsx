import propTypes from "prop-types";

export default function Card({ card, handleDeleteCard }) {
	return (
		<div className="card">
			<img src={card.image} alt={card.title} className="card-image" />
			<h2 className="card-title">{card.title}</h2>
			<h3 className="card-category">{card.category}</h3>
			<div className="btns-container">
                <button>
					View Comments
				</button>
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
