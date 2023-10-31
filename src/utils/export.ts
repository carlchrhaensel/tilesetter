import { TileMap, TileSet } from '../App';
import { base64ToImage } from './base64';

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

        const tileSourcePositionX = parseInt(tileSetId.split('-')[0], 10) * tileSet.tileWidth;
        const tileSourcePositionY = parseInt(tileSetId.split('-')[1], 10) * tileSet.tileHeight;

        const tileDestinationPositionX = parseInt(tileMapId.split('-')[0], 10) * tileSet.tileWidth;
        const tileDestinationPositionY = parseInt(tileMapId.split('-')[1], 10) * tileSet.tileHeight;

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