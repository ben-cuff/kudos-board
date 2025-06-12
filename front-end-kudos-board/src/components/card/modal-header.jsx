import { Gif } from "@giphy/react-components";
import propTypes from "prop-types";
import "./modal-header.css";

export default function ModalHeader({
	card,
	gifData,
	colors,
	setToggleCommentsModal,
}) {
	return (
		<div className="header-from-gif">
			<div className="modal-header">
				<h3 style={{ color: colors.primary }}>{card.message}</h3>
				<button
					className="close-btn"
					onClick={() => setToggleCommentsModal(false)}
				>
					×
				</button>
			</div>
			<div className="gif-container">
				{gifData ? (
					<Gif
						gif={gifData}
						percentWidth="60%"
						height="auto"
						noLink={true}
					/>
				) : (
					<img src="https://picsum.photos/200" />
				)}
			</div>
			{card.author ? (
				<p style={{ color: colors.primary }}>From: {card.author}</p>
			) : (
				<p style={{ color: colors.primary }}>From: anonymous</p>
			)}
		</div>
	);
}
ModalHeader.propTypes = {
	card: propTypes.object.isRequired,
	gifData: propTypes.object,
	colors: propTypes.object.isRequired,
	setToggleCommentsModal: propTypes.func.isRequired,
};
