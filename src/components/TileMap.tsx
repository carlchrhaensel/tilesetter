import { TileSet } from '../App';
import { ImageDimensions } from '../utils/base64';
import { calcTileId } from '../utils/tileId';
import { EmpyTile } from './EmptyTile';
import { SelectableTile } from './SelectableTile';

interface Props {
    rows: number;
    cols: number;
    tileSet: TileSet;
    tileMap: Record<string, string>;
    selectedTileId: string;
    onSelect: (row: number, col: number) => void;
    imageDimensions: ImageDimensions;
}

export const TileMap = (props: Props) => {
    const rows = 10;
    const cols = 10;

    const tileHeight = props.tileSet.tileHeight || 16;
    const tileWidth = props.tileSet.tileWidth || 16;

    return (
        <>
            {new Array(rows).fill(0).map((_, indexHeight) => (
                <div
                    key={indexHeight}
                    className='flex flex-row'>
                    {new Array(cols).fill(0).map((_, indexWidth) => {
                        const tileMapId = calcTileId(indexHeight, indexWidth);
                        const tileSetId = props.tileMap[tileMapId] ?? "";


                        if (tileSetId === "") {
                            return (
                                <EmpyTile
                                    key={calcTileId(indexHeight, indexWidth)}
                                    tileScale={4}
                                    tileHeight={tileHeight}
                                    tileWidth={tileWidth}
                                    selected={false}
                                    onSelect={() => {
                                        props.onSelect(indexHeight, indexWidth);
                                    }}
                                />
                            );
                        }

                        return (
                            <SelectableTile
                                key={calcTileId(indexHeight, indexWidth)}
                                imageHeight={props.imageDimensions.height}
                                imageWidth={props.imageDimensions.width}
                                indexHeight={parseInt(tileSetId.split('-')[0])}
                                indexWidth={parseInt(tileSetId.split('-')[1])}
                                selected={false}
                                tileScale={4}
                                tileSet={props.tileSet}
                                onSelect={() => {
                                    props.onSelect(indexHeight, indexWidth);
                                }}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
};
