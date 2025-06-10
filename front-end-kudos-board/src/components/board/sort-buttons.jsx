import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import "./sort-buttons.css";

export default function SortButtons() {
	const { colors } = useTheme();
	const [activeFilter, setActiveFilter] = useState("All");

	const filters = [
		"All",
		"Recent",
		"Celebration",
		"Thank You",
		"Inspiration",
	];

	return (
		<div className="btns-container">
			{filters.map((filter) => (
				<button
					key={filter}
					className="sort-buttons"
					onClick={() => setActiveFilter(filter)}
					style={{
						border:
							activeFilter === filter
								? `2px solid ${colors.button}`
								: `1px solid ${colors.border}`,
						background: colors.card,
					}}
				>
					{filter}
				</button>
			))}
		</div>
	);
}
