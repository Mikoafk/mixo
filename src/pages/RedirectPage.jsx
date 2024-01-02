import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { database } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function RedirectPage({ fileId }) {
    const packsCollection = collection(database, "packs");
    const packsQuery = query(packsCollection, where("id", "==", fileId));

    const [snapshot, loading] = useCollection(packsQuery);

    useEffect(() => {
        if (!loading && snapshot) {
            const data = snapshot.docs.map((x) => x.data());
            window.location.href = data[0].url;
        }
    }, [snapshot, loading]);

    return (
        <Box>
            <Typography variant="h1">
                Tu archivo se está descargando!
            </Typography>
        </Box>
    );
}
