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

import { Header } from "presentation/components/Header/Header";
import { ViewContainer } from "presentation/components/ViewContainer/ViewContainer";
import { LoadingOverlay } from "presentation/components/LoadingOverlay/LoadingOverlay";
import { AsyncOp } from "utils/AsyncOp";
import { Group } from "domain/GroupDomain";
import { getGroups } from "persistence/groupPersistence";

function Groups(): JSX.Element {
    const [groups, setGroups] = useState<AsyncOp<Group[], null>>({ status: "pending" });

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
                <TableContainer component={Paper} sx={{ overflow: "auto", height: "100%" }}>
                    <Table sx={{ width: 650 }} aria-label="tasks table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Group name</TableCell>
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
