import propTypes from "prop-types";
import { useEffect } from "react";
import useComments from "../../../hooks/use-comments";
import { useTheme } from "../../../hooks/use-theme";
import CommentsForm from "./comments-form";
import CommentsList from "./comments-list";
import "./comments-modal.css";
import ModalHeader from "./modal-header";

export default function CommentsModal({
	gifData,
	setToggleCommentsModal,
	card,
}) {
	const { colors } = useTheme();
	const {
		newComment,
		setNewComment,
		comments,
		handleSubmitComment,
		setBoardId,
		setCardId,
	} = useComments(card);

	useEffect(() => {
		setBoardId(card.boardId);
		setCardId(card.id);
	}, [card.boardId, card.id, setBoardId, setCardId]);

	return (
		<div className="overlay-style">
			<div
				className="modal-style"
				style={{ background: colors.background }}
			>
				<ModalHeader
					card={card}
					gifData={gifData}
					colors={colors}
					setToggleCommentsModal={setToggleCommentsModal}
				/>
				<div>
					<h3 style={{ color: colors.primary, textAlign: "center" }}>
						Comments
					</h3>
					<CommentsList comments={comments} colors={colors} />
					<CommentsForm
						newComment={newComment}
						setNewComment={setNewComment}
						handleSubmitComment={handleSubmitComment}
					/>
				</div>
			</div>
		</div>
	);
}

CommentsModal.propTypes = {
	gifData: propTypes.object,
	setToggleCommentsModal: propTypes.func.isRequired,
	card: propTypes.object.isRequired,
};
