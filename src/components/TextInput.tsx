import { twMerge } from 'tailwind-merge';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  state: string;
  setState: (value: string) => void | React.Dispatch<React.SetStateAction<string>>;
}

export const TextInput = (props: Props) => {
  const { setState, state, ...rest } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }

  return (
    <div className='flex flex-col'>
      <label className="block text-sm font-bold text-slate-300">
        {props.label}
      </label>
      <input
        {...rest}
        value={state}
        onChange={onChange}
        className={twMerge("border-slate-950  border-2 rounded-lg px-4 py-2 bg-slate-700", props.className)}
      />
    </div>
  );
};
