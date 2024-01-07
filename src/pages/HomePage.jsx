import { useState, useEffect } from "react";

import { database } from "../firebase";
import { collection } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import RedirectPage from "./RedirectPage";
import SearchBar from "../components/SearchBar";
import CardFile from "../components/CardFile";

import "../styles/home.css";
import Footer from "../components/Footer";

export default function HomePage() {
    const [packs, setPacks] = useState([]);
    const [value, loading, error] = useCollection(
        collection(database, "packs")
    );

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
        <>
            <div className="container">
                <div style={{ marginBottom: "3rem" }}>
                    <h1 className="title-page">PACKS</h1>
                    <p className="short-description-page">
                        Encuentra aquí los packs publicados en el canal de{" "}
                        <a
                            href="https://youtube.com/c/miko2007"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            MIKO._.
                        </a>
                    </p>
                </div>

                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <SearchBar />
                </div>

                <div
                    style={{
                        display: "grid",
                        gap: "2rem",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(20rem, 1fr))",
                        marginTop: "2.5rem",
                        justifyContent: "center",
                    }}
                >
                    {loading &&
                        Array.from({ length: 6 }, (_, index) => (
                            <CardFile key={index} loading />
                        ))}
                    {error && <h1>Al parecer ocurrió un error!</h1>}
                    {packs &&
                        packs.map((pack, index) => (
                            <CardFile
                                key={index}
                                name={pack.name}
                                size={pack.size}
                                type={pack.type}
                                id={pack.id}
                            />
                        ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
