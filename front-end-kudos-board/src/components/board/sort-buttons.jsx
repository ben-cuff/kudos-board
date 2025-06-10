import PropTypes from "prop-types";
import { useTheme } from "../../hooks/use-theme";
import "./sort-buttons.css";

export default function SortButtons({ categoryInput, setCategoryInput }) {
	const { colors } = useTheme();

	const filters = [
		"All",
		"Recent",
		"Celebration",
		"Thank_You",
		"Inspiration",
	];

	return (
		<div className="btns-container">
			{filters.map((filter) => (
				<button
					key={filter}
					className="sort-buttons"
					onClick={() => setCategoryInput(filter)}
					style={{
						border:
							categoryInput === filter
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

SortButtons.propTypes = {
	categoryInput: PropTypes.string.isRequired,
	setCategoryInput: PropTypes.func.isRequired,
};
