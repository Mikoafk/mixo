import { useState } from "react";
import { Search } from "@mui/icons-material";

import "../styles/search-bar.css";

export default function SearchBar({ ...props }) {
    const [textSearch, setTextSearch] = useState("");

    return (
        <div className="search-bar-main">
            <input
                className="search-input"
                name="search"
                placeholder="Buscar packs... (eso suena mal)"
                value={textSearch}
                onChange={(e) => setTextSearch(e.target?.value)}
            />
            <button className="search-button">
                <Search />
            </button>
        </div>
    );
}
