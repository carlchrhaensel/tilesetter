import { TileSet } from '../App';
import {clsx} from 'clsx';

interface Props {
    tileSet: TileSet;
    selected: boolean;
    onSelect: () => void;
    indexHeight: number;
    indexWidth: number;
    tileScale: number;
    imageHeight: number;
    imageWidth: number;
}

export const SelectableTile = (props: Props) => {
    return (
        <>
            <button
                onClick={props.onSelect}
                className={clsx({"border-white border-2": props.selected})}
                style={{
                    height: (props.tileSet.tileHeight || 16) * props.tileScale,
                    width: (props.tileSet.tileWidth || 16) * props.tileScale,
                    aspectRatio:
                        `${(props.tileSet.tileWidth || 16) * props.tileScale} / ` +
                        `${(props.tileSet.tileHeight || 16) * props.tileScale}`,
                    backgroundImage: `url(${props.tileSet.imageBase64})`,
                    backgroundPositionX: `-${
                        (props.tileSet.tileWidth || 0) * props.tileScale * props.indexWidth
                    }px`,
                    backgroundPositionY: `-${
                        (props.tileSet.tileHeight || 0) * props.tileScale * props.indexHeight
                    }px`,
                    backgroundSize:
                        `${props.imageWidth * props.tileScale}px ` +
                        `${props.imageHeight * props.tileScale}px`,
                    //backgroundSize: "auto"
                }}></button>
        </>
    );
};