import { Group } from "domain/GroupDomain";
import { persistedGroupsResource } from "./mockDatabase";

export function getGroups(): Promise<Group[]> {
    return new Promise((res) => {
        setTimeout(() => {
            res(persistedGroupsResource);
        }, 3000);
    });
}

export function addGroup(groupName: string): Promise<void> {
    return new Promise((res) => {
        setTimeout(() => {
            persistedGroupsResource.push({
                id: persistedGroupsResource.length,
                name: groupName,
            });
            res();
            console.log(persistedGroupsResource);
        }, 3000);
    });
}
