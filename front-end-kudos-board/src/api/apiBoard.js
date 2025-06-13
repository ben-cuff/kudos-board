const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiBoard = {
	getBoards: async () => {
		try {
			const response = await fetch(`${baseUrl}/board`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching boards:", error);
			throw error;
		}
	},

	addBoard: async (title, category, author, image) => {
		try {
			await fetch(`${baseUrl}/board`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, category, author, image }),
			});
		} catch (error) {
			console.error("Error adding board:", error);
			throw error;
		}
	},

	searchBoard: async (searchInput) => {
		try {
			const response = await fetch(`${baseUrl}/board?search=${searchInput}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error searching boards:", error);
			throw error;
		}
	},

	deleteBoard: async (boardId) => {
		try {
			await fetch(`${baseUrl}/board/${boardId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error deleting board:", error);
			throw error;
		}
	},

	getCategoryBoard: async (category) => {
		try {
			const response = await fetch(
				`${baseUrl}/board?category=${category.toUpperCase()}`
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching category boards:", error);
			throw error;
		}
	},

	getBoard: async (boardId) => {
		try {
			const response = await fetch(`${baseUrl}/board/${boardId}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching board:", error);
			throw error;
		}
	},
};
