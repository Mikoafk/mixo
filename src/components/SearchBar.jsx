import { Stack, TextField, IconButton } from "@mui/material";
import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ ...props }) {
    const [textSearch, setTextSearch] = useState("");

    return (
        <Stack component="form" direction="row" spacing={1} alignItems="center">
            <TextField
                {...props}
                name="search"
                value={textSearch}
                onChange={(e) => setTextSearch(e.target?.value)}
            />
            <IconButton color="primary" aria-label="search" type="submit">
                <SearchIcon />
            </IconButton>
        </Stack>
    );
}
