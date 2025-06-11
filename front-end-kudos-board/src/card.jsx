import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./card.css";
import ChangeTheme from "./components/change-theme";
import { useTheme } from "./hooks/use-theme";

export default function Card() {
	const [boardData, setBoardData] = useState({});
	const [cardData, setCardData] = useState([]);
	const { boardId } = useParams();
	const { colors } = useTheme();

	document.body.style.backgroundColor = colors.background;

	useEffect(() => {
		(async () => {
			const responseBoard = await fetch(
				`${import.meta.env.VITE_BASE_URL}/board/${boardId}`
			);
			const dataBoard = await responseBoard.json();

			setBoardData(dataBoard);

			const responseCard = await fetch(
				`${import.meta.env.VITE_BASE_URL}/board/${boardId}/card`
			);

			const dataCard = await responseCard.json();

			setCardData(dataCard);
		})();
	}, [boardId]);
	return (
		<div className="container">
			<header className="header-container">
				<h1 style={{ color: colors.primary }}>👏Kudos Board👏</h1>
			</header>
			<div className="create-theme-container">
				{/* <button
                    className="create-btn"
                    style={{
                        background: colors.button,
                        color: colors.background,
                    }}
                    onClick={() => {
                        setToggleCreateModal(!toggleCreateModal);
                    }}
                >
                    Create a New Board
                </button> */}
				<ChangeTheme />
			</div>
			<h3>{boardData.title}</h3>
		</div>
	);
}
