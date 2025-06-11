import propTypes from "prop-types";
import { useTheme } from "../../hooks/use-theme";
import "./search-bar.css";

export default function SearchBar({ setSearchInput, handleSearchSubmit }) {
	const { colors } = useTheme();
    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit();
            }}
        >
            <input
                placeholder="Search boards..."
                className="search-input"
                id="search-input"
                onChange={(e) => {
                    setSearchInput(e.target.value);
                }}
            />
            <button
                className="search-btn"
                type="submit"
                style={{ background: colors.button, color: colors.background }}
            >
                Search
            </button>
            <button
                type="button"
                className="search-btn"
                style={{ background: colors.button, color: colors.background }}
                onClick={() => {
                    setSearchInput("");
                    document.getElementById("search-input").value = "";
                }}
            >
                Clear
            </button>
        </form>
    );
}

SearchBar.propTypes = {
	setSearchInput: propTypes.func.isRequired,
	handleSearchSubmit: propTypes.func.isRequired,
};
