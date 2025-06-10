const express = require("express");
const { PrismaClient } = require("@prisma/client");

const CATEGORIES = ["CELEBRATION", "THANK_YOU", "INSPIRATION"];

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Root route" });
});

app.get("/board", async (req, res) => {
	try {
		const boards = await prisma.board.findMany();

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

app.post("/board", async (req, res) => {
	try {
		const { title, image, category } = req.body;
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
			data: { title, image, category },
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

		//TODO:: ADD DELETION OF CHILD CARDS TOO
		try {
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

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
