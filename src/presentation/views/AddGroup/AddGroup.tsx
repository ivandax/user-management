import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Header } from "presentation/components/Header/Header";
import { ViewContainer } from "presentation/components/ViewContainer/ViewContainer";
import { LoadingOverlay } from "presentation/components/LoadingOverlay/LoadingOverlay";
import { AsyncOp } from "utils/AsyncOp";
import { addGroup } from "persistence/groupPersistence";

function AddGroup(): JSX.Element {
    const navigate = useNavigate();

    const [addGroupTask, setAddGroupTask] = useState<AsyncOp<null, null>>({ status: "pending" });
    const [groupName, setGroupName] = useState("");
    const [groupNameError, setGroupNameError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (groupName === "") {
            setGroupNameError("Name is required");
            return;
        }
        setAddGroupTask({ status: "in-progress" });
        await addGroup(groupName);
        setAddGroupTask({ status: "successful", data: null });
        navigate("/");
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Header />
            <ViewContainer>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5">Add a group</Typography>
                    {addGroupTask.status === "in-progress" ? <LoadingOverlay /> : null}
                    <TextField
                        label="Group name"
                        value={groupName}
                        onChange={(e) => {
                            setGroupNameError(null);
                            setGroupName(e.target.value);
                        }}
                        sx={{ mt: 2, mb: 1, width: 300 }}
                        size="small"
                        error={groupNameError !== null}
                        helperText={groupNameError ?? null}
                    />
                </Box>
                <Box sx={{ display: "flex", alignSelf: "flex-end" }}>
                    <Button
                        onClick={() => navigate("/")}
                        variant="outlined"
                        sx={{ width: "150px", marginRight: "4px" }}
                    >
                        Back
                    </Button>
                    <Button onClick={handleSubmit} variant="outlined" sx={{ width: "150px" }}>
                        Save
                    </Button>
                </Box>
            </ViewContainer>
        </Box>
    );
}

export { AddGroup };
