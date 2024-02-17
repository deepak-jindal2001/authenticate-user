interface Props {
  type: string;
  id: string;
  name: string;
  value: string;
  classes?: string;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelName?: string;
  labelClasses?: string;
  showLabel?: boolean;
  required?: boolean;
}

const InputField: React.FC<Props> = ({
  type,
  id,
  name,
  value,
  classes,
  onChangeHandler,
  labelName,
  labelClasses,
  showLabel = true,
  required = true,
}) => {
  return (
    <>
      {showLabel && (
        <label htmlFor={id} className={`block text-gray-700 ${labelClasses}`}>
          {labelName || name}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={onChangeHandler}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${classes}`}
      />
    </>
  );
};

export default InputField;
