import { useEffect, useState } from "react";

import { database } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import MikoLogo from "../images/miko.jpg";

export default function RedirectPage({ fileId }) {
    const packsCollection = collection(database, "packs");
    const packsQuery = query(packsCollection, where("id", "==", fileId));

    const [snapshot, loading, error] = useCollection(packsQuery);
    const [dataPack, setDataPack] = useState(null);

    useEffect(() => {
        if (!loading && snapshot) {
            const data = snapshot.docs.map((x) => x.data());
            window.location.href = data[0]?.url;
            setDataPack(data[0]);
        }
    }, [snapshot, loading]);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center"
            }}
        >
            <img
                style={{
                    marginBottom: "1rem",
                    borderRadius: "50%",
                }}
                src={MikoLogo}
                alt="miko logo"
            />
            <h1>
                {loading && `Obteniendo el archivo...`}
                {error && `Ocurrió un error al intentar descargar el archivo!`}
                {dataPack && `Tu archivo se está descargando!`}
            </h1>
            <span style={{ color: "#bbb" }}>
                Gracias por visitar mi canal de YouTube :D
            </span>
        </div>
    );
}
