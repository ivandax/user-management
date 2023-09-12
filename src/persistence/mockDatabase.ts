import { Group } from "domain/GroupDomain";
import { User } from "domain/UserDomain";

const persistedGroupsResource: Group[] = [
    { id: 0, name: "general" },
    { id: 1, name: "Marketing" },
    { id: 2, name: "IT" },
    { id: 3, name: "Finance" },
];

const persistedUsersResource: User[] = [
    { id: 0, name: "John Wick", groupIds: [0] },
    { id: 1, name: "Edward Hyde", groupIds: [0, 1] },
    { id: 2, name: "Macklemore", groupIds: [0, 2] },
    { id: 3, name: "Luke Skywalker", groupIds: [0, 3] },
];

export { persistedGroupsResource, persistedUsersResource };
