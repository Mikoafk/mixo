import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1a1e2b",
            paper: "#1a1e2b"
        },
        primary: {
            main: "#87CEFA",
        },
        secondary: {
            main: "#E384FF",
        },
    },
    typography: {
        fontFamily: "Afacad, roboto, sans-serif"
    },
});
