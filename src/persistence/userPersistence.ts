import { User } from "domain/UserDomain";
import { persistedUsersResource, persistedGroupsResource } from "./mockDatabase";
import { Group } from "domain/GroupDomain";

function groupIdToGroupInfo(id: number) {
    const foundGroup = persistedGroupsResource.find((group) => group.id === id);
    if (foundGroup) {
        return { id, name: foundGroup.name };
    }
    return { id, name: "Undetermined name" };
}

export type ExtendedUser = User & {
    groups: Group[];
};

export function getUsers(): Promise<ExtendedUser[]> {
    return new Promise((res) => {
        setTimeout(() => {
            const extendedUsers: ExtendedUser[] = persistedUsersResource.map((user) => {
                return { ...user, groups: user.groupIds.map(groupIdToGroupInfo) };
            });
            res(extendedUsers);
        }, 3000);
    });
}

export function addUser(userName: string, groupIds: number[]): Promise<void> {
    return new Promise((res) => {
        setTimeout(() => {
            persistedUsersResource.push({
                id: persistedUsersResource.length,
                name: userName,
                groupIds: [0, ...groupIds],
            });
            res();
            console.log(persistedUsersResource);
        }, 3000);
    });
}