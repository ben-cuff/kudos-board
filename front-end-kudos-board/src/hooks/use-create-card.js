import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState } from "react";

export default function useCreateCard() {
    const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
	const [searchTerm, setSearchTerm] = useState("");
	const [gifData, setGifData] = useState(null);

	const fetchGifs = (offset) => {
		if (offset >= 6) return Promise.resolve({ data: [] });
		const limit = Math.min(16, 16 - offset);
		return gf.search(searchTerm, { offset, limit });
    };
    return {
        searchTerm,
        setSearchTerm,
        gifData,
        setGifData,
        fetchGifs,
    };
}
