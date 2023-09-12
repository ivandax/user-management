import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Header } from "presentation/components/Header/Header";
import { ViewContainer } from "presentation/components/ViewContainer/ViewContainer";
import { LoadingOverlay } from "presentation/components/LoadingOverlay/LoadingOverlay";
import { AsyncOp } from "utils/AsyncOp";
import { getUserById, editUser } from "persistence/userPersistence";
import { getGroups } from "persistence/groupPersistence";
import { Group } from "domain/GroupDomain";
import { User } from "domain/UserDomain";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function EditUser(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();

    const [groups, setGroups] = useState<AsyncOp<Group[], null>>({ status: "pending" });
    const [persistedUser, setPersistedUser] = useState<AsyncOp<User, null>>({ status: "pending" });
    const [editUserTask, setEditUserTask] = useState<AsyncOp<null, null>>({ status: "pending" });

    const handleGetGroups = async () => {
        setGroups({ status: "in-progress" });
        const result = await getGroups();
        setGroups({ status: "successful", data: result });
    };

    const handleGetPersistedUser = async () => {
        if (params.userId) {
            setPersistedUser({ status: "in-progress" });
            const result = await getUserById(params.userId);
            setUserName(result.name);
            setSelectedGroups(
                result.groupIds.filter((num) => num !== 0).map((id) => id.toString())
            );
            setPersistedUser({ status: "successful", data: result });
        }
    };

    useEffect(() => {
        handleGetGroups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleGetPersistedUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState<string | null>(null);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setSelectedGroups(typeof value === "string" ? value.split(",") : value);
    };

    const handleSubmit = async () => {
        if (userName === "") {
            setUserNameError("Name is required");
            return;
        }
        if (persistedUser.status === "successful") {
            setEditUserTask({ status: "in-progress" });
            await editUser({
                ...persistedUser.data,
                name: userName,
                groupIds: [0, ...selectedGroups.map((string) => parseInt(string))],
            });
            setEditUserTask({ status: "successful", data: null });
            navigate("/users");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Header />
            <ViewContainer>
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h5">Edit user</Typography>
                    {editUserTask.status === "in-progress" ||
                    groups.status === "in-progress" ||
                    persistedUser.status === "in-progress" ? (
                        <LoadingOverlay />
                    ) : null}
                    <TextField
                        label="User name"
                        value={userName}
                        onChange={(e) => {
                            setUserNameError(null);
                            setUserName(e.target.value);
                        }}
                        sx={{ mt: 2, mb: 1, width: 300 }}
                        size="small"
                        error={userNameError !== null}
                        helperText={userNameError ?? null}
                    />
                    {groups.status === "successful" ? (
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">Group</InputLabel>
                            <Select
                                labelId="demo-multiple-group-label"
                                id="demo-multiple-group"
                                multiple
                                value={selectedGroups}
                                renderValue={(selected) => {
                                    const numberIds = selected.map((string) => parseInt(string));
                                    return numberIds.map((id) => {
                                        const foundGroup = groups.data.find(
                                            (group) => group.id === id
                                        );
                                        return foundGroup
                                            ? `${foundGroup.name}, `
                                            : `${selected}, `;
                                    });
                                }}
                                onChange={handleChange}
                                input={<OutlinedInput label="Groups" />}
                                MenuProps={MenuProps}
                            >
                                {groups.data
                                    .filter((group) => group.name !== "general")
                                    .map((group) => (
                                        <MenuItem key={group.id} value={group.id}>
                                            {group.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                            <Typography variant="caption">
                                All users will belong to the 'general' group by default
                            </Typography>
                        </FormControl>
                    ) : null}
                </Box>
                <Box sx={{ display: "flex", alignSelf: "flex-end" }}>
                    <Button
                        onClick={() => navigate("/users")}
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

export { EditUser };
