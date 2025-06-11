import propTypes from "prop-types";
import { useEffect } from "react";
import Card from "./card";

export default function CardList({
	cardData,
	handleDeleteCard,
	handleUpvoteCard,
	handlePinCard,
}) {
	if (!cardData || cardData.length === 0) {
		return <h1>No cards Found</h1>;
	}

	return (
		<div className="cards-container">
			{cardData.sort((a, b) => {
				if (a.pinned === b.pinned) {
					if (a.pinned && a.pinnedAt && b.pinnedAt) {
						return b.pinnedAt - a.pinnedAt;
					}
					return 0;
				}
				return a.pinned ? -1 : 1;
			}).map((card) => (
				<Card
					key={card.id}
					card={card}
					handleDeleteCard={handleDeleteCard}
					handleUpvoteCard={handleUpvoteCard}
					handlePinCard={handlePinCard}
				/>
			))}
		</div>
	);
}

CardList.propTypes = {
	cardData: propTypes.arrayOf(propTypes.object).isRequired,
	handleDeleteCard: propTypes.func.isRequired,
	handleUpvoteCard: propTypes.func.isRequired,
	handlePinCard: propTypes.func.isRequired,
};
