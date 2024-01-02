import { useState, useEffect } from "react";
import { Chip, Container, Stack, Typography, Grid } from "@mui/material";
import SearchBar from "../components/SearchBar";
import CardFile from "../components/CardFile";

import { database } from "../firebase";
import { collection } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import RedirectPage from "./RedirectPage";

export default function HomePage() {
    const [packs, setPacks] = useState([]);
    const [value, loading] = useCollection(collection(database, "packs"));

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const fileQuery = query.get("file");

    useEffect(() => {
        if (!loading && value) {
            const data = value.docs.map((v) => v.data());
            setPacks(data);
        }
    }, [loading, value]);

    return fileQuery ? (
        <RedirectPage fileId={fileQuery} />
    ) : (
        <Container maxWidth="lg">
            <Stack alignItems="center" mb={10}>
                <Typography variant="h1" fontWeight="bolder">
                    Mixo
                    <Chip label="BETA" color="primary" sx={{ ml: 2 }} />
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                    mb={5}
                >
                    Recursos <span>gratis</span> para creadores de contenido
                </Typography>
                <SearchBar
                    placeholder="Buscar recursos..."
                    size="small"
                    sx={{ width: 430 }}
                />
            </Stack>
            <Grid container spacing={{ xs: 2 }}>
                {!loading &&
                    packs.map((pack, index) => (
                        <Grid xs={12} md={6} lg={3} key={index} item>
                            <CardFile
                                name={pack?.name}
                                type={pack?.type}
                                size={pack?.size}
                                id={pack?.id}
                            />
                        </Grid>
                    ))}
            </Grid>
            {/* <Pagination count={1} /> */}
        </Container>
    );
}
