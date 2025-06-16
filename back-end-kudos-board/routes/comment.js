const router = require("express").Router();
const prisma = require("../prisma");

router.post("/board/:boardId/card/:cardId/comment", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;

		if (!boardId || !cardId) {
			res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
			return;
		}

		const card = await prisma.card.findUnique({
			where: { id: Number(cardId) },
		});

		if (!card || card.boardId !== Number(boardId)) {
			res.status(404).json({
				error: "Card not found for the provided board ID",
			});
			return;
		}

		const { message, author } = req.body;
		if (!message) {
			res.status(400).json({
				error: "Missing required field: message",
			});
			return;
		}

		const comment = await prisma.comment.create({
			data: {
				message,
				author,
				cardId: Number(cardId),
			},
		});

		res.status(201).json(comment);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

router.get("/board/:boardId/card/:cardId/comment", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;
		if (!boardId || !cardId) {
			res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
			return;
		}

		const comments = await prisma.comment.findMany({
			where: { cardId: Number(cardId) },
		});

		if (!comments) {
			res.status(404).json({
				error: "Comments not found for the provided board ID and card ID",
			});
			return;
		}

		res.status(200).json(comments);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

module.exports = router;

