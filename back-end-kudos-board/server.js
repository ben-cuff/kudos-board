const express = require("express");
const cors = require("cors");

const app = express();

const boardRouter = require("./routes/board");
const cardRouter = require("./routes/card");
const commentRouter = require("./routes/comment");

app.use(express.json());

app.use(cors());

app.get("/", (_req, res) => {
	res.status(200).json({ message: "Root route" });
});

app.use("", boardRouter);

app.use("", cardRouter);

app.use("", commentRouter);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
