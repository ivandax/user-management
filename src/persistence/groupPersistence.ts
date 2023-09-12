import { Group } from "domain/GroupDomain";
import { persistedGroupsResource } from "./mockDatabase";

export function getGroups(): Promise<Group[]> {
    return new Promise((res) => {
        setTimeout(() => {
            res(persistedGroupsResource);
        }, 3000);
    });
}
