import React from "react";
import { Box, Paper } from "@mui/material";

interface ViewContainerProps {
    children: JSX.Element | (JSX.Element | null | JSX.Element[])[];
}

function ViewContainer({ children }: ViewContainerProps): JSX.Element {
    return (
        <Box sx={{ flexGrow: 1, display: "flex", backgroundColor: "#f4f4f4", overflow: "hidden" }}>
            <Paper
                elevation={3}
                sx={{
                    mx: { sm: 3, md: 12 },
                    my: 2,
                    px: 2,
                    py: 2,
                    flexGrow: 1,
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Paper>
        </Box>
    );
}

export { ViewContainer };
