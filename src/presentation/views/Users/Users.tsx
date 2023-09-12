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
    IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { Header } from "presentation/components/Header/Header";
import { ViewContainer } from "presentation/components/ViewContainer/ViewContainer";
import { LoadingOverlay } from "presentation/components/LoadingOverlay/LoadingOverlay";
import { AsyncOp } from "utils/AsyncOp";
import { ExtendedUser, getUsers, deleteUser } from "persistence/userPersistence";

function Users(): JSX.Element {
    const [users, setUsers] = useState<AsyncOp<ExtendedUser[], null>>({ status: "pending" });
    const [deleteUserTask, setDeleteUserTask] = useState<AsyncOp<null, null>>({
        status: "pending",
    });

    const handleGetUsers = async () => {
        setUsers({ status: "in-progress" });
        const result = await getUsers();
        setUsers({ status: "successful", data: result });
    };

    const handleDeleteUser = async (id: number) => {
        setDeleteUserTask({ status: "in-progress" });
        await deleteUser(id);
        setDeleteUserTask({ status: "successful", data: null });
        handleGetUsers();
    };

    useEffect(() => {
        handleGetUsers();
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Header />
            <ViewContainer>
                {users.status === "in-progress" || deleteUserTask.status === "in-progress" ? (
                    <LoadingOverlay />
                ) : null}
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
                                <TableCell>Actions</TableCell>
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
                                            <TableCell component="th" scope="row">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="menu"
                                                    sx={{ mr: 2 }}
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
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
