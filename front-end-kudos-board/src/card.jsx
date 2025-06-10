import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Card() {
	const [boardData, setBoardData] = useState({});
	const [cardData, setCardData] = useState([]);
	let { cardId } = useParams();

	useEffect(() => {
		async () => {
			const responseBoard = await fetch(
				`${import.meta.env.VITE_BASE_URL}/board`
			);
			const dataBoard = await responseBoard.json();
			console.log(dataBoard);
			setBoardData(dataBoard);

			const responseCard = await fetch(
				`${import.meta.env.VITE_BASE_URL}/board/${cardId}/card`
			);
			const dataCard = await responseCard.json();

			console.log(dataCard);
			setBoardData(dataCard);
		};
	});
}
