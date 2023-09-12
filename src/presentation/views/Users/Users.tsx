import React, { useState, useEffect } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

import { Header } from "presentation/components/Header/Header";
import { ViewContainer } from "presentation/components/ViewContainer/ViewContainer";
import { LoadingOverlay } from "presentation/components/LoadingOverlay/LoadingOverlay";
import { AsyncOp } from "utils/AsyncOp";
import { ExtendedUser, getUsers } from "persistence/userPersistence";

function Users(): JSX.Element {
    const [users, setUsers] = useState<AsyncOp<ExtendedUser[], null>>({ status: "pending" });

    const handleGetGroups = async () => {
        setUsers({ status: "in-progress" });
        const result = await getUsers();
        setUsers({ status: "successful", data: result });
    };

    useEffect(() => {
        handleGetGroups();
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Header />
            <ViewContainer>
                {users.status === "in-progress" ? <LoadingOverlay /> : null}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        paddingBottom: "8px",
                        justifyContent: "flex-end",
                    }}
                >
                    <Link to="/add-user">Add user</Link>
                </Box>
                <TableContainer component={Paper} sx={{ overflow: "auto", height: "100%" }}>
                    <Table sx={{ width: 650 }} aria-label="tasks table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>User name</TableCell>
                                <TableCell>Groups</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.status === "successful" && users.data.length === 0 ? (
                                <TableRow>
                                    <TableCell component="th" scope="row" colSpan={7}>
                                        No users available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.status === "successful" &&
                                users.data.map((user) => {
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell component="th" scope="row">
                                                {user.id}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{ maxWidth: "220px" }}
                                            >
                                                {user.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {user.groups.map((group) => group.name).join(", ")}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ViewContainer>
        </Box>
    );
}

export { Users };
