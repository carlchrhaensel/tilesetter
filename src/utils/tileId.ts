export const calcTileId = (row: number, col: number) => {
    return `${row}-${col}`;
};

export const splitTileId = (tileSetId: string) => {
    const row = parseInt(tileSetId.split('-')[0], 10);
    const col = parseInt(tileSetId.split('-')[1], 10);
    return {row, col}
}