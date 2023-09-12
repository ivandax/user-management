export function getNewIdFromResource(resource: { id: number }[]): number {
    const ids = resource.map((item) => item.id);
    return Math.max(...ids) + 1;
}
