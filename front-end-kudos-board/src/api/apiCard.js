const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiCard = {
	getCards: async (boardId) => {
		const response = await fetch(`${baseUrl}/board/${boardId}/card`);
		const data = await response.json();
		return data;
	},
	deleteCard: async (boardId, cardId) => {
		await fetch(`${baseUrl}/board/${boardId}/card/${cardId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
	upvoteCard: async (boardId, cardId) => {
		await fetch(
			`${import.meta.env.VITE_BASE_URL}/board/${boardId}/card/${cardId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					operation: "upvote",
				}),
			}
		);
	},
	pinCard: async (boardId, cardId) => {
		await fetch(
			`${
				import.meta.env.VITE_BASE_URL
			}/board/${boardId}/card/${cardId}/pin`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
    },
    createCard: async (boardId, { message, gif, author }) => {
        await fetch(`${import.meta.env.VITE_BASE_URL}/board/${boardId}/card`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, gif, author }),
        });
    }
};
