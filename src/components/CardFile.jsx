import rarImg from "../images/rar.png";
import "../styles/card-pack.css";

export default function CardFile({
    loading = false,
    name = "Desconocido",
    size = 0,
    type = "Desconocido",
    id,
}) {
    return loading ? (
        <div className="suspense-card"></div>
    ) : (
        <a href={`/?file=${id}`} target="_blank" rel="noreferrer">
            <div className="card-main">
                <div className="card-thumbnail">
                    <img src={rarImg} alt="thumbnail" loading="lazy" />
                </div>
                <div style={{ textAlign: "start" }}>
                    <span>{name}</span>
                    <div style={{ color: "#bbb" }}>
                        <span>Peso: {(size / 1024 / 1024).toFixed(1)} mb</span>
                        <br />
                        <span>
                            Tipo de archivo:{" "}
                            <span style={{ textTransform: "uppercase" }}>
                                {type}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
}
