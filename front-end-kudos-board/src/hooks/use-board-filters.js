import { useCallback, useEffect, useState } from "react";
import { apiBoard } from "../api/apiBoard";

// I want to avoid passing hooks as parameters, but do not know the best way to do it.
// some sort of context would be better, but not entirely sure how to implement it.
export function useBoardFilters(fetchBoardData, setBoardData) {
	const [categoryInput, setCategoryInput] = useState("All");
	const [searchInput, setSearchInput] = useState("");

	const handleSearchSubmit = useCallback(async () => {
		setCategoryInput("All");
		const data = await apiBoard.searchBoard(searchInput);
		setBoardData(data);
	}, [searchInput, setBoardData]);

	const fetchBoardsByCategory = useCallback(
		async (category) => {
			try {
				const data = await apiBoard.getCategoryBoard(category);
				setBoardData(data);
			} catch (error) {
				console.error("Failed to fetch boards by category:", error);
			}
		},
		[setBoardData]
	);

	useEffect(() => {
		if (categoryInput === "All") {
			fetchBoardData();
		} else if (categoryInput === "Recent") {
			setBoardData((prevData) =>
				[...prevData]
					.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
					)
					.slice(0, 6)
			);
		} else {
			fetchBoardsByCategory(categoryInput);
		}
	}, [fetchBoardData, categoryInput, setBoardData, fetchBoardsByCategory]);

	useEffect(() => {
		if (searchInput === "") fetchBoardData();
	}, [searchInput, fetchBoardData]);

	return {
		categoryInput,
		setCategoryInput,
		searchInput,
		setSearchInput,
		handleSearchSubmit,
	};
}
