const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const CATEGORIES = ["CELEBRATION", "THANK_YOU", "INSPIRATION"];

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Root route" });
});

app.get("/board", async (req, res) => {
	try {
		const { category } = req.query;
		const where = {};

		if (category) {
			if (!CATEGORIES.includes(category)) {
				return res
					.status(400)
					.json({ error: "Invalid category provided" });
			}
			where.category = category;
		}

		const boards = await prisma.board.findMany({ where });

		if (boards) {
			res.status(200).json(boards);
		} else {
			res.status(404).json({
				error: "Not Found: No boards found",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

app.get("/board/:boardId", async (req, res) => {
	try {
		const { boardId } = req.params;
		if (!boardId) {
			return res.status(400).json({
				error: "Missing board ID in path parameter",
			});
		}

		const board = await prisma.board.findUnique({
			where: { id: Number(boardId) },
		});

		if (board) {
			res.status(200).json(board);
		} else {
			res.status(404).json({
				error: "Not Found: Board with that ID does not exist",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

app.post("/board", async (req, res) => {
	try {
		const { title, image, category, author } = req.body;
		if (!title || !image || !category) {
			res.status(400).json({
				error: "Missing required fields: title, image, or category",
			});
			return;
		}

		if (!CATEGORIES.includes(category)) {
			res.status(400).json({ error: "Incorrect category provided" });
			return;
		}

		const board = await prisma.board.create({
			data: { title, image, category, image },
		});
		res.status(201).json(board);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

app.delete("/board/:boardId", async (req, res) => {
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
				where: { boardId: Number(boardId) },
				select: { id: true },
			});
			const cardIds = cards.map((card) => card.id);

			if (cardIds.length > 0) {
				await prisma.comment
					.deleteMany({
						where: { cardId: { in: cardIds } },
					})
					.catch(() => {});
				await prisma.card
					.deleteMany({
						where: { boardId: Number(boardId) },
					})
					.catch(() => {});
			} else {
				await prisma.card
					.deleteMany({
						where: { boardId: Number(boardId) },
					})
					.catch(() => {});
			}

			const deletedBoard = await prisma.board.delete({
				where: { id: Number(boardId) },
			});

			res.status(200).json(deletedBoard);
		} catch (error) {
			res.status(404).json({
				error: "Not Found: Board with that ID does not exist",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

app.get("/board/:boardId/card", async (req, res) => {
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

app.post("/board/:boardId/card", async (req, res) => {
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

app.get("/board/:boardId/card/:cardId", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;
		if (!boardId || !cardId) {
			return res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
		}

		const card = await prisma.card.findUnique({
			where: {
				id: Number(cardId),
				boardId: Number(boardId),
			},
		});

		if (!card) {
			return res.status(404).json({
				error: "Card not found for the provided board ID",
			});
		}

		res.status(200).json(card);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

app.patch("/board/:boardId/card/:cardId", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;
		const { operation } = req.body;

		if (!boardId || !cardId) {
			return res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
		}

		if (
			!operation ||
			(operation !== "upvote" && operation !== "downvote")
		) {
			return res.status(400).json({
				error: "Invalid or missing operation. Must be 'upvote' or 'downvote'",
			});
		}

		const card = await prisma.card.findUnique({
			where: {
				id: Number(cardId),
				boardId: Number(boardId),
			},
		});

		if (!card) {
			return res.status(404).json({
				error: "Card not found for the provided board ID",
			});
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

app.patch("/board/:boardId/card/:cardId/pin", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;

		if (!boardId || !cardId) {
			return res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
		}

		const card = await prisma.card.findUnique({
			where: {
				id: Number(cardId),
				boardId: Number(boardId),
			},
		});

		if (!card) {
			return res.status(404).json({
				error: "Card not found for the provided board ID",
			});
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

app.delete("/board/:boardId/card/:cardId", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;
		if (!boardId || !cardId) {
			return res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
		}

		const card = await prisma.card.findUnique({
			where: {
				id: Number(cardId),
				boardId: Number(boardId),
			},
		});

		if (!card) {
			return res.status(404).json({
				error: "Card not found for the provided board ID",
			});
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

app.post("/board/:boardId/card/:cardId/comment", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;
		if (!boardId || !cardId) {
			return res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
		}

		const card = await prisma.card.findUnique({
			where: { id: Number(cardId) },
		});

		if (!card || card.boardId !== Number(boardId)) {
			return res.status(404).json({
				error: "Card not found for the provided board ID",
			});
		}

		const { message, author } = req.body;
		if (!message) {
			return res.status(400).json({
				error: "Missing required field: message",
			});
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

app.get("/board/:boardId/card/:cardId/comment", async (req, res) => {
	try {
		const { boardId, cardId } = req.params;
		if (!boardId || !cardId) {
			return res.status(400).json({
				error: "Missing board or card ID in path parameters",
			});
		}

		const comments = await prisma.comment.findMany({
			where: { cardId: Number(cardId) },
		});

		if (!comments) {
			return res.status(404).json({
				error: "Comments not found for the provided board ID and card ID",
			});
		}

		res.status(200).json(comments);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
