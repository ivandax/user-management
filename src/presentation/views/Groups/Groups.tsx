import React from "react";
import { Box } from "@mui/material";

import { Header } from "presentation/components/Header/Header";
import { ViewContainer } from "presentation/components/ViewContainer/ViewContainer";
import { LoadingOverlay } from "presentation/components/LoadingOverlay/LoadingOverlay";

function Groups(): JSX.Element {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Header />
            <ViewContainer>
                <div>test</div>
            </ViewContainer>
        </Box>
    );
}

export { Groups };
