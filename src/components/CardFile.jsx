import {
    Chip,
    Typography,
    Card,
    CardHeader,
    CardActions,
    IconButton,
    CardContent,
} from "@mui/material";

import Download from "@mui/icons-material/Download";

export default function CardFile({
    name = "Desconocido",
    size = 0,
    type = "Desconocido",
    id,
}) {
    return (
        <Card>
            <CardContent
                sx={{
                    height: 150,
                    bgcolor: "#000",
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <h1 style={{ fontSize: 72, color: "#fff" }}>RAR</h1>
                {/* <img
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                    }}
                    src="https://cdn6.aptoide.com/imgs/2/4/8/248de32b95c7477689bf4d2be418fdc1_icon.png"
                    alt="banner"
                /> */}
            </CardContent>
            <CardHeader
                title={
                    <Typography noWrap>
                        {name}
                        <Chip label={type} size="small" sx={{ ml: 1 }} />
                    </Typography>
                }
                subheader={
                    <>
                        <Typography variant="caption" color="text.secondary">
                            Peso: {(size / 1024 / 1024).toFixed(2)} mb
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary">
                            Formato: {type}
                        </Typography>
                    </>
                }
            />
            <CardActions disableSpacing>
                <IconButton
                    LinkComponent="a"
                    href={`/?file=${id}`}
                    target="_blank"
                    aria-label="download file"
                >
                    <Download />
                </IconButton>
            </CardActions>
        </Card>
    );
}
