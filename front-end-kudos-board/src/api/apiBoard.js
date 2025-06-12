const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiBoard = {
	getBoard: async () => {
		const response = await fetch(`${baseUrl}/board`);
		const data = await response.json();
		return data;
	},

	addBoard: async (title, category, author, image) => {
		await fetch(`${baseUrl}/board`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, category, author, image }),
		});
	},

	searchBoard: async (searchInput) => {
		const response = await fetch(`${baseUrl}/board?search=${searchInput}`);
		const data = await response.json();
		return data;
	},

	deleteBoard: async (boardId) => {
		await fetch(`${baseUrl}/board/${boardId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
    },
    
    getCategoryBoard: async (category) => {
        const response = await fetch(
            `${baseUrl}/board?category=${category.toUpperCase()}`
        );
        const data = await response.json();
        return data;
    },
};
