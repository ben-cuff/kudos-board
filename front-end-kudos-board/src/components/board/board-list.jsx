import propTypes, { object } from "prop-types";
import BoardCard from "./board-card";

export default function BoardList({ boardData, handleDeleteBoard }) {
	if (!boardData || boardData.length === 0) {
		return <h1>No boards Found</h1>;
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
			}}
		>
			{boardData.map((board, index) => (
				<BoardCard
					key={index}
					board={board}
					handleDeleteBoard={handleDeleteBoard}
				/>
			))}
		</div>
	);
}

BoardList.propTypes = {
	boardData: propTypes.arrayOf(object).isRequired,
	handleDeleteBoard: propTypes.func.isRequired,
};
