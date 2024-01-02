import { useEffect, useState } from "react";
import { UploadFile } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";

import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { database, storage } from "../firebase";

function generateRandomId(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
    }

    return randomId;
}

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [extFile, setExtFile] = useState("");

    useEffect(() => {
        const extension = file?.name.match(/\.[^.]+$/);
        setExtFile(extension ? extension[0] : null);
    }, [file]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postRef = collection(database, "packs");
        const newPostRef = doc(postRef);

        const mediaRef = ref(storage, "packs/" + file.name);
        await uploadBytes(mediaRef, file);
        const downloadURL = await getDownloadURL(mediaRef);

        await setDoc(newPostRef, {
            id: generateRandomId(8),
            name: file.name.replace(extFile, ""),
            size: file.size,
            type: file.type !== "" ? file.type : extFile,
            url: downloadURL,
            extension: extFile,
            createdAt: serverTimestamp(),
        });
    };

    return (
        <Container>
            <Button
                variant="outlined"
                component="label"
                sx={{
                    width: 500,
                    height: 150,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <span>
                    <UploadFile /> Subir nuevo archivo
                </span>
                <Typography variant="overline" color="text.secondary">
                    {file?.name}
                </Typography>
                <input
                    hidden
                    accept=".zip,.rar,.7z,.gz"
                    type="file"
                    onChange={handleFileChange}
                />
            </Button>
            <Box>
                <Typography>Info</Typography>
                <Typography>Nombre: {file?.name.replace(extFile, "")}</Typography>
                <Typography>Tamaño: {(file?.size / 1024 / 1024).toFixed(2)} MB</Typography>
                <Typography>Tipo: {file?.type || extFile}</Typography>
                <Typography>Extension: {extFile}</Typography>
            </Box>
            <Button variant="contained" onClick={handleSubmit}>Subir</Button>
        </Container>
    );
}
