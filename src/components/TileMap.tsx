import { useState } from 'react';
import { TileSet } from '../App';
import { ImageDimensions } from '../utils/base64';
import { calcTileId } from '../utils/tileId';
import { EmpyTile } from './EmptyTile';
import { SelectableTile } from './SelectableTile';
import { Counter } from './Counter';

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
    const tileHeight = props.tileSet.tileHeight || 16;
    const tileWidth = props.tileSet.tileWidth || 16;

    const [tileScale, setTileScale] = useState(4);

    return (
        <>
            <div className='pb-2'>
                <Counter
                    state={tileScale}
                    setState={setTileScale}
                    steps={0.5}
                />
            </div>
            
            {new Array(props.rows).fill(0).map((_, indexHeight) => (
                <div
                    key={indexHeight}
                    className='flex flex-row'>
                    {new Array(props.cols).fill(0).map((_, indexWidth) => {
                        const tileMapId = calcTileId(indexHeight, indexWidth);
                        const tileSetId = props.tileMap[tileMapId] ?? '';

                        if (tileSetId === '') {
                            return (
                                <EmpyTile
                                    key={calcTileId(indexHeight, indexWidth)}
                                    tileScale={tileScale}
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
                                tileScale={tileScale}
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
