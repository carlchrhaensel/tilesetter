import { TileSet } from '../App';
import { ImageDimensions } from '../utils/base64';
import { calcTileId } from '../utils/tileId';
import { SelectableTile } from './SelectableTile';

interface Props {
    tileSet: TileSet;
    setSelectedTile: (row: number, col: number) => void;
    selectedTileId: string;
    imageDimensions: ImageDimensions;
}

export const TileSelector = (props: Props) => {
    if (props.imageDimensions == null) {
        console.log('imageDimensions is null');
        return null;
    }

    const amountHeight = Math.floor(
        props.imageDimensions.height / (props.tileSet.tileHeight || 16)
    );
    const amountWidth = Math.floor(props.imageDimensions.width / (props.tileSet.tileWidth || 16));

    const tileScale = 2;

    return (
        <div>
            Select tile
            <p>
                Dimensions: {props.imageDimensions.width}x{props.imageDimensions.height}
            </p>
            <div className='flex flex-col gap-0.5 max-w-full overflow-auto'>
                {new Array(amountHeight).fill(0).map((_, indexHeight) => (
                    <div
                        key={indexHeight}
                        className='flex flex-row gap-0.5'>
                        {new Array(amountWidth).fill(0).map((_, indexWidth) => (
                            <SelectableTile
                                key={calcTileId(indexHeight, indexWidth)}
                                tileSet={props.tileSet}
                                selected={
                                    calcTileId(indexHeight, indexWidth) === props.selectedTileId
                                }
                                onSelect={() => props.setSelectedTile(indexHeight, indexWidth)}
                                indexHeight={indexHeight}
                                indexWidth={indexWidth}
                                tileScale={tileScale}
                                imageHeight={props.imageDimensions.height}
                                imageWidth={props.imageDimensions.width}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
