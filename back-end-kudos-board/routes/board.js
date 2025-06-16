const router = require("express").Router();

const CATEGORIES = ["CELEBRATION", "THANK_YOU", "INSPIRATION"];
const prisma = require("../prisma");

router.get("/board", async (req, res) => {
	try {
		const { category, search } = req.query;
		const where = {};

		if (category) {
			if (!CATEGORIES.includes(category)) {
				res.status(400).json({ error: "Invalid category provided" });
				return;
			}
			where.category = category;
		}

		if (search) {
			where.title = { contains: search, mode: "insensitive" };
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

router.get("/board/:boardId", async (req, res) => {
	try {
		const { boardId } = req.params;

		if (!boardId) {
			res.status(400).json({
				error: "Missing board ID in path parameter",
			});
			return;
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

router.post("/board", async (req, res) => {
	try {
		const { title, image, category, author } = req.body;

		if (!title || !category) {
			res.status(400).json({
				error: "Missing required fields: title, or category",
			});
			return;
		}

		if (!CATEGORIES.includes(category)) {
			res.status(400).json({ error: "Incorrect category provided" });
			return;
		}

		const board = await prisma.board.create({
			data: { title, image, category, image, author },
		});
		res.status(201).json(board);
	} catch (error) {
		res.status(500).json({
			message: "An unexpected server error occurred",
			error,
		});
	}
});

router.delete("/board/:boardId", async (req, res) => {
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

module.exports = router;
