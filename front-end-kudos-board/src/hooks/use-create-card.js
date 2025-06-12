import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState } from "react";

export default function useCreateCard() {
	const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedGifData, setSelectedGifData] = useState(null);

	const fetchGifs = (offset) => {
		return gf.search(searchTerm, { offset });
	};
	return {
		searchTerm,
		setSearchTerm,
		selectedGifData,
		setSelectedGifData,
		fetchGifs,
	};
}
