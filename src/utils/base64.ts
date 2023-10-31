export const toBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('Error converting to base64');
            }
        };
        reader.onerror = reject;
    });
};

export interface ImageDimensions {
    width: number;
    height: number;
}

export function getImageDimensions(file: string) {
    return new Promise<ImageDimensions>(function (resolved) {
        const i = new Image();
        i.onload = function () {
            resolved({ width: i.width, height: i.height });
        };
        i.src = file;
    });
}

export const base64ToImage = (base64: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = base64;
    });
}
