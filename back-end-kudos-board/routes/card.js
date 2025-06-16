const router = require("express").Router();
const prisma = require("../prisma");

router.get("/board/:boardId/card", async (req, res) => {
	try {
		const { boardId } = req.params;

		if (!boardId) {
			res.status(400).json({
				error: "Missing board ID in path parameter",
			});
			return;
		}

		try {
			const cards = await prisma.card.findMany({
				where: {
					boardId: Number(boardId),
				},
			});

			res.status(200).json(cards);
		} catch (error) {
			res.status(404).json({
				error: "Not Found: No cards found for that board ID or that board ID does not exist",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

router.post("/board/:boardId/card", async (req, res) => {
	try {
		const { boardId } = req.params;

		if (!boardId) {
			res.status(400).json({
				error: "Missing board ID in path parameter",
			});
			return;
		}

		try {
			await prisma.board.findUnique({ where: { id: Number(boardId) } });
		} catch (error) {
			res.status(404).json({
				error: "Not Found: No board with the provided board ID",
			});
			return;
		}

		const {
			message,
			gif,
			upvotes = 0,
			pinned = false,
			pinnedAt,
			author,
		} = req.body;

		if (!message || !gif) {
			res.status(400).json({
				error: "Missing required fields: message and gif",
			});
			return;
		}

		const data = {
			message,
			gif,
			upvotes,
			author,
			boardId: Number(boardId),
			pinned,
		};

		if (pinnedAt) {
			data.pinnedAt = new Date(pinnedAt);
		}

		const card = await prisma.card.create({
			data,
		});

		res.status(201).json(card);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

router.get("/board/:boardId/card/:cardId", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;

		if (!boardId || !cardId) {
			res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
			return;
		}

		const card = await prisma.card.findUnique({
			where: {
				id: Number(cardId),
				boardId: Number(boardId),
			},
		});

		if (!card) {
			res.status(404).json({
				error: "Card not found for the provided board ID",
			});
			return;
		}

		res.status(200).json(card);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

router.patch("/board/:boardId/card/:cardId", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;
		const { operation } = req.body;

		if (!boardId || !cardId) {
			res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
			return;
		}

		if (
			!operation ||
			(operation !== "upvote" && operation !== "downvote")
		) {
			res.status(400).json({
				error: "Invalid or missing operation. Must be 'upvote' or 'downvote'",
			});
			return;
		}

		const card = await prisma.card.findUnique({
			where: {
				id: Number(cardId),
				boardId: Number(boardId),
			},
		});

		if (!card) {
			res.status(404).json({
				error: "Card not found for the provided board ID",
			});
			return;
		}

		const incrementValue = operation === "upvote" ? 1 : -1;

		const updatedCard = await prisma.card.update({
			where: { id: Number(cardId) },
			data: { upvotes: { increment: incrementValue } },
		});

		res.status(200).json(updatedCard);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

router.patch("/board/:boardId/card/:cardId/pin", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;

		if (!boardId || !cardId) {
			res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
			return;
		}

		const card = await prisma.card.findUnique({
			where: {
				id: Number(cardId),
				boardId: Number(boardId),
			},
		});

		if (!card) {
			res.status(404).json({
				error: "Card not found for the provided board ID",
			});
			return;
		}

		if (card.pinned) {
			const updatedCard = await prisma.card.update({
				where: { id: Number(cardId) },
				data: { pinned: false },
			});
			res.status(200).json(updatedCard);
		} else {
			const updatedCard = await prisma.card.update({
				where: { id: Number(cardId) },
				data: { pinned: true, pinnedAt: new Date() },
			});
			res.status(200).json(updatedCard);
		}
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

router.delete("/board/:boardId/card/:cardId", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;

		if (!boardId || !cardId) {
			res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
			return;
		}

		const card = await prisma.card.findUnique({
			where: {
				id: Number(cardId),
				boardId: Number(boardId),
			},
		});

		if (!card) {
			res.status(404).json({
				error: "Card not found for the provided board ID",
			});
			return;
		}

		await prisma.card.delete({ where: { id: Number(cardId) } });
		await prisma.comment
			.deleteMany({
				where: { cardId: Number(cardId) },
			})
			.catch(() => {});

		res.status(200).json(card);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

module.exports = router;
