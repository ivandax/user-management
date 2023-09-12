import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

function Header(): JSX.Element {
    const navigate = useNavigate();

    const handleGoToGroups = (): void => {
        navigate("/");
    };
    const handleGoToUsers = (): void => {
        navigate("/users");
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                        User Management
                    </Typography>
                    <Button onClick={handleGoToGroups} sx={{ color: "white" }}>
                        Groups
                    </Button>
                    <Button onClick={handleGoToUsers} sx={{ color: "white" }}>
                        Users
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export { Header };
