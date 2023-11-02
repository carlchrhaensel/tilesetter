import { TileMap, TileSet } from '../App';
import { base64ToImage } from './base64';
import { splitTileId } from './tileId';

export const exportTileMap = async (
    tileMap: TileMap,
    tileSet: TileSet,
    rows: number,
    cols: number
) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return;
    }

    canvas.width = cols * tileSet.tileWidth;
    canvas.height = rows * tileSet.tileHeight;

    const image = await base64ToImage(tileSet.imageBase64);

    Object.keys(tileMap).forEach((tileMapId) => {
        const tileSetId = tileMap[tileMapId];

        const tileSetPos = splitTileId(tileSetId);
        const tileSourcePositionX = tileSetPos.col * tileSet.tileWidth;
        const tileSourcePositionY = tileSetPos.row * tileSet.tileHeight;

        const tileMapPos = splitTileId(tileMapId);
        const tileDestinationPositionX = tileMapPos.col * tileSet.tileWidth;
        const tileDestinationPositionY = tileMapPos.row * tileSet.tileHeight;

        ctx.drawImage(
            image,
            tileSourcePositionX, // sx
            tileSourcePositionY, // sy
            tileSet.tileWidth, // sWidth
            tileSet.tileHeight, // sHeight
            tileDestinationPositionX, // dx
            tileDestinationPositionY, // dy
            tileSet.tileWidth, // dWidth
            tileSet.tileHeight // dHeight
        );
    });

    downloadCanvasAsImage(canvas);
};

export const downloadCanvasAsImage = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.download = 'tilemap.png';
    link.href = canvas.toDataURL();
    link.click();
};
