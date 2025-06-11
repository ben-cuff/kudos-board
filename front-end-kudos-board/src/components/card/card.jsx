import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";
import propTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Card({
	card,
	handleDeleteCard,
	handleUpvoteCard,
	handlePinCard,
}) {
	const [gifData, setGifData] = useState(null);

	useEffect(() => {
		const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
		const fetchGifData = async () => {
			try {
				if (card.gif) {
					const { data } = await gf.gif(card.gif);
					setGifData(data);
				}
			} catch (error) {
				console.error("Error fetching gif:", error);
			}
		};

		fetchGifData();
	}, [card.gif]);

	return (
		<div className="card">
			{gifData ? (
				<Gif gif={gifData} width={200} noLink={true} />
			) : (
				<img src="https://picsum.photos/200" />
			)}
			<h2 className="card-title">{card.message}</h2>
			<div className="btns-container">
				<button onClick={() => handleUpvoteCard(card.id)}>
					Upvotes: {card.upvotes}
				</button>
				<button>View Comments</button>
				<button onClick={() => handleDeleteCard(card.id)}>
					Delete
				</button>
				<button onClick={() => handlePinCard(card.id)}>
					{card.pinned ? "Pinned" : "Press here to pin"}
				</button>
			</div>
		</div>
	);
}

Card.propTypes = {
	card: propTypes.object.isRequired,
	handleDeleteCard: propTypes.func.isRequired,
	handleUpvoteCard: propTypes.func.isRequired,
	handlePinCard: propTypes.func.isRequired,
};
