import { useState } from 'react';
import { Button } from './components/Button';
import { Hr } from './components/Hr';
import { ImageUpload } from './components/ImageUpload';
import { TextInput } from './components/TextInput';
import { TopNav } from './components/TopNav';
import { v4 } from 'uuid';
import { ImageDimensions, getImageDimensions, toBase64 } from './utils/base64';
import { TileSelector } from './components/TileSelector';
import { calcTileId } from './utils/tileId';
import { TileMap } from './components/TileMap';
import { exportTileMap } from './utils/export';
import { Counter } from './components/Counter';

export interface TileSet {
    id: string;
    filename: string;
    imageBase64: string;
    tileHeight: number;
    tileWidth: number;
    tileMargin: number;
}

export type TileMap = Record<string, string>;

function App() {
    const [tileSet, setTileSet] = useState<TileSet | null>(null);
    const [selectedTileId, setSelectedTileId] = useState(calcTileId(0, 0));

    const [tileMap, setTileMap] = useState<TileMap>({});

    const [tileHeight, setTileHeight] = useState(16);
    const [tileWidth, setTileWidth] = useState(16);
    const [tileMargin, setTileMargin] = useState(0);

    const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);

    const [tileMapRows, setTileMapRows] = useState(10);
    const [tileMapCols, setTileMapCols] = useState(10);

    const onUpload = async (file: File) => {
        const base64 = await toBase64(file);
        const tileset = {
            id: v4(),
            filename: file.name,
            imageBase64: base64,
            tileHeight: tileHeight || 16,
            tileWidth: tileHeight || 16,
            tileMargin: tileMargin || 0,
        } satisfies TileSet;

        setTileSet(tileset);

        const uploadedImageDimensions = await getImageDimensions(base64 || '');
        setImageDimensions(uploadedImageDimensions);
    };

    const onTileMapDownloadClick = () => {
        exportTileMap(tileMap, tileSet || ({} as TileSet), tileMapRows, tileMapCols);
    };

    return (
        <>
            <TopNav />
            <main className='flex flex-row min-h-full fixed'>
                <aside className='p-4 bg-slate-700 min-h-full max-h-full space-y-2 w-96 overflow-auto'>
                    <div className='flex flex-row gap-2'>
                        <Button>Open project</Button>
                        <Button>Save project</Button>
                        <Button onClick={onTileMapDownloadClick}>Export image</Button>
                    </div>

                    <Hr />

                    <div className='grid grid-cols-2 gap-2'>
                        <TextInput
                            label='Tile height'
                            className='w-full'
                            state={tileHeight.toString()}
                            setState={(v) => setTileHeight(parseInt(v))}
                        />
                        <TextInput
                            label='Tile width'
                            className='w-full'
                            state={tileWidth.toString()}
                            setState={(v) => setTileWidth(parseInt(v))}
                        />
                        <TextInput
                            label='Tile margin'
                            className='w-full'
                            state={tileMargin.toString()}
                            setState={(v) => setTileMargin(parseInt(v))}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <p className='pb-1'>Rows</p>
                           <Counter state={tileMapRows} setState={setTileMapRows} />
                        </div>
                        <div>
                            <p className='pb-1'>Columns</p>
                            <Counter state={tileMapCols} setState={setTileMapCols}/>
                        </div>
                    </div>

                    <Hr />

                    {tileSet != null && imageDimensions != null ? (
                        <TileSelector
                            setSelectedTile={(row, col) => setSelectedTileId(calcTileId(row, col))}
                            tileSet={tileSet}
                            selectedTileId={selectedTileId}
                            imageDimensions={imageDimensions}
                        />
                    ) : null}

                    <ImageUpload onUpload={onUpload} />
                </aside>

                <section className='p-4'>
                    {imageDimensions != null ? (
                        <TileMap
                            rows={tileMapRows}
                            cols={tileMapCols}
                            tileSet={tileSet || ({} as TileSet)}
                            tileMap={tileMap}
                            selectedTileId={selectedTileId}
                            onSelect={(row: number, col: number) => {
                                const tileId = calcTileId(row, col);
                                setTileMap((prev) => ({
                                    ...prev,
                                    [tileId]: selectedTileId,
                                }));
                            }}
                            imageDimensions={imageDimensions}
                        />
                    ) : null}
                </section>
            </main>
        </>
    );
}

export default App;
