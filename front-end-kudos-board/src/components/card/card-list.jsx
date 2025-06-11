import propTypes from "prop-types";
import Card from "./card";

export default function CardList({ cardData, handleDeleteCard }) {
	if (!cardData || cardData.length === 0) {
		return <h1>No cards Found</h1>;
	}

	return (
		<div className="cards-container">
			{cardData.map((card, index) => (
				<Card
					key={index}
					card={card}
					handleDeleteCard={handleDeleteCard}
				/>
			))}
		</div>
	);
}

CardList.propTypes = {
	cardData: propTypes.arrayOf(propTypes.object).isRequired,
	handleDeleteCard: propTypes.func.isRequired,
};
