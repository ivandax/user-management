import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";

function LoadingOverlay(): JSX.Element {
    return (
        <Backdrop open sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export { LoadingOverlay };