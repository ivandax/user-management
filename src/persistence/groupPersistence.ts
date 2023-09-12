import { persistedGroupsResource } from "./mockDatabase";

export function getGroups() {
    return new Promise((res) => {
        setTimeout(() => {
            res(persistedGroupsResource);
        }, 3000);
    });
}
