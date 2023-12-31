import { Group } from "domain/GroupDomain";
import { persistedGroupsResource, persistedUsersResource } from "./mockDatabase";
import { getNewIdFromResource } from "utils/ids";

function getUsersOfGroup(groupId: number) {
    return persistedUsersResource.filter((user) => user.groupIds.includes(groupId));
}

export type ExtendedGroup = Group & { userCount: number };

export function getGroups(): Promise<ExtendedGroup[]> {
    return new Promise((res) => {
        const extendedGroups: ExtendedGroup[] = persistedGroupsResource.map((group) => {
            return { ...group, userCount: getUsersOfGroup(group.id).length };
        });
        setTimeout(() => {
            res(extendedGroups);
        }, 1500);
    });
}

export function addGroup(groupName: string): Promise<void> {
    return new Promise((res) => {
        setTimeout(() => {
            persistedGroupsResource.push({
                id: getNewIdFromResource(persistedGroupsResource),
                name: groupName,
            });
            res();
            console.log(persistedGroupsResource);
        }, 1500);
    });
}

export function deleteGroup(groupId: number): Promise<void> {
    return new Promise((res) => {
        setTimeout(() => {
            const index = persistedGroupsResource.findIndex((user) => user.id === groupId);
            persistedGroupsResource.splice(index, 1);
            res();
            console.log(persistedGroupsResource);
        }, 1500);
    });
}
