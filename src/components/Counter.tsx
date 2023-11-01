import { Button } from './Button';

interface Props {
    state: number;
    setState: React.Dispatch<React.SetStateAction<number>>;
    steps?: number;
}

export const Counter = (props: Props) => {
    const onIncreaseClick = () => {
        props.setState((i) => i + (props.steps || 1));
    };

    const onDecreaseClick = () => {
        props.setState((i) => i - (props.steps || 1));
    };

    return (
        <>
            <div className='flex gap-2 items-center'>
                <Button onClick={onDecreaseClick}>-</Button>
                <p className='min-w-[2.5rem] text-center'>{props.state}</p>
                <Button onClick={onIncreaseClick}>+</Button>
            </div>
        </>
    );
};
