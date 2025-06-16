const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiCard = {
	getCards: async (boardId) => {
		try {
			const response = await fetch(`${baseUrl}/board/${boardId}/card`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching cards:", error);
			throw error;
		}
	},
	deleteCard: async (boardId, cardId) => {
		try {
			await fetch(`${baseUrl}/board/${boardId}/card/${cardId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error deleting card:", error);
			throw error;
		}
	},
	upvoteCard: async (boardId, cardId) => {
		try {
			await fetch(`${baseUrl}/board/${boardId}/card/${cardId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					operation: "upvote",
				}),
			});
		} catch (error) {
			console.error("Error upvoting card:", error);
			throw error;
		}
	},
	pinCard: async (boardId, cardId) => {
		try {
			await fetch(`${baseUrl}/board/${boardId}/card/${cardId}/pin`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error pinning card:", error);
			throw error;
		}
	},
	createCard: async (boardId, { message, gif, author }) => {
		try {
			await fetch(`${baseUrl}/board/${boardId}/card`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message, gif, author }),
			});
		} catch (error) {
			console.error("Error creating card:", error);
			throw error;
		}
	},
	getComments: async (boardId, cardId) => {
		try {
			const response = await fetch(
				`${baseUrl}/board/${boardId}/card/${cardId}/comment`
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching comments:", error);
			throw error;
		}
	},
	addComment: async (boardId, cardId, { message, author }) => {
		try {
			await fetch(
				`${baseUrl}/board/${boardId}/card/${cardId}/comment`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ message, author }),
				}
			);
		} catch (error) {
			console.error("Error adding comment:", error);
			throw error;
		}
	},
};
