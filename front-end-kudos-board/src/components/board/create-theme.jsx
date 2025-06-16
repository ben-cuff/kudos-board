import propTypes from "prop-types";
import useTheme from "../../hooks/use-theme";
import ChangeTheme from "../change-theme";
import "./create-theme.css";

export default function CreateTheme({
	setToggleCreateModal,
	toggleCreateModal,
}) {
	const { colors } = useTheme();

	return (
		<div className="create-theme-container">
			<button
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
			</button>
			<ChangeTheme />
		</div>
	);
}

CreateTheme.propTypes = {
	setToggleCreateModal: propTypes.func.isRequired,
	toggleCreateModal: propTypes.bool.isRequired,
};
