interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: Props) => {
    return (
        <button
            {...props}
            className='bg-slate-900 text-white rounded-lg px-4 py-2'>
            {props.children}
        </button>
    );
};
