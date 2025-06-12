import { useNavigate } from "react-router";
import { useTheme } from "../../hooks/use-theme";
import "./card-header.css";

export default function CardHeader() {
	const { navigate } = useNavigate();
	const { colors } = useTheme();
	return (
		<header className="header-container">
			<button
				className="back-button"
				style={{
					color: colors.primary,
				}}
				onClick={() => navigate(-1)}
			>
				←
			</button>
			<h1 style={{ color: colors.primary }}>👏Kudos Board👏</h1>
		</header>
	);
}
