interface Props {
    selected: boolean;
    onSelect: () => void;
    tileScale: number;
    tileHeight: number;
    tileWidth: number;
}

export const EmpyTile = (props: Props) => {
    return (
        <button
            onClick={props.onSelect}
            style={{
                border: "1px solid white",
                height: (props.tileHeight || 16) * props.tileScale,
                width: (props.tileWidth || 16) * props.tileScale,
                aspectRatio:
                    `${(props.tileWidth || 16) * props.tileScale} / ` +
                    `${(props.tileHeight || 16) * props.tileScale}`,
            }}></button>
    );
};
