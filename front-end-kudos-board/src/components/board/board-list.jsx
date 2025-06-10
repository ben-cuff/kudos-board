import propTypes, { object } from "prop-types";
import BoardCard from "./board-card";

export default function BoardList({ boardData }) {
	return (
		<div
			style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
		>
			{boardData.map((board, index) => (
				<BoardCard key={index} board={board} />
			))}
		</div>
	);
}

BoardList.propTypes = {
	boardData: propTypes.arrayOf(object).isRequired,
};
