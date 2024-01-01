import { useState, useEffect } from "react";
import { Chip, Container, Stack, Typography, Grid } from "@mui/material";
import SearchBar from "../components/SearchBar";
import CardFile from "../components/CardFile";

import { database } from "../firebase";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function HomePage() {
    const [packs, setPacks] = useState([]);
    const [value, loading] = useCollection(collection(database, "packs"));

    useEffect(() => {
        if (!loading && value) {
            const data = value.docs.map((v) => v.data());
            setPacks(data);
        }
    }, [loading, value]);

    return (
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
                        <Grid key={index} item>
                            <CardFile
                                name={pack?.name}
                                type={pack?.type}
                                size={pack?.size}
                                url={pack?.url}
                                id={pack?.id}
                            />
                        </Grid>
                    ))}
            </Grid>
            {/* <Pagination count={1} /> */}
        </Container>
    );
}
