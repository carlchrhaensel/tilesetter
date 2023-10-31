import { useRef } from 'react';
import { Button } from './Button';

interface Props {
    onUpload?: (file: File) => void;
}

export const ImageUpload = (props: Props) => {
    const uploadRef = useRef<HTMLInputElement>(null);

    const onSelectImageClick = () => {
        uploadRef.current?.click();
    };

    const onChange = () => {
        const file = uploadRef.current?.files?.[0];
        if (!file) return;

        props.onUpload?.(file);
    };

    return (
        <div>
            <input
                ref={uploadRef}
                type='file'
                accept='image/*'
                hidden
                onChange={onChange}
            />
            <Button onClick={onSelectImageClick}>Upload Tileset</Button>
        </div>
    );
};
