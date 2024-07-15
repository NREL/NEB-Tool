export function getGUID(): string {
    return Math.random().toString(36).substr(2, 9);
}

export function getNewId(currentId: string, GUIDS: Array<{oldId: string, newId: string}>): string {
    let GUID: string = GUIDS.find(id => id.oldId === currentId)?.newId;
    return GUID;
}