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
import { getGroups, ExtendedGroup } from "persistence/groupPersistence";

function Groups(): JSX.Element {
    const [groups, setGroups] = useState<AsyncOp<ExtendedGroup[], null>>({ status: "pending" });

    const handleGetGroups = async () => {
        setGroups({ status: "in-progress" });
        const result = await getGroups();
        setGroups({ status: "successful", data: result });
    };

    useEffect(() => {
        handleGetGroups();
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Header />
            <ViewContainer>
                {groups.status === "in-progress" ? <LoadingOverlay /> : null}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        paddingBottom: "8px",
                        justifyContent: "flex-end",
                    }}
                >
                    <Link to="/add-group">Add group</Link>
                </Box>
                <TableContainer component={Paper} sx={{ overflow: "auto", height: "100%" }}>
                    <Table aria-label="groups table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Group name</TableCell>
                                <TableCell>Total Users</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groups.status === "successful" && groups.data.length === 0 ? (
                                <TableRow>
                                    <TableCell component="th" scope="row" colSpan={7}>
                                        No groups available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                groups.status === "successful" &&
                                groups.data.map((group) => {
                                    return (
                                        <TableRow key={group.id}>
                                            <TableCell component="th" scope="row">
                                                {group.id}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{ maxWidth: "220px" }}
                                            >
                                                {group.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {group.userCount}
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

export { Groups };
