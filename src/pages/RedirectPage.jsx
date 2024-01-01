import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function RedirectPage() {
    const { id } = useParams();
    const packsCollection = collection(database, "packs");
    const packsQuery = query(packsCollection, where("id", "==", id));

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
