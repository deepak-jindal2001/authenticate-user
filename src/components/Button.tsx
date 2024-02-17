import React from "react";

interface Props {
  type: "submit" | "reset" | "button" | undefined;
  btnText: string;
  isLoading?: boolean;
  classes?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  type,
  classes,
  btnText,
  isLoading = false,
  onClick = () => {},
}) => {
  const disabledStateClasses = "bg-blue-500/50 hover:bg-blue-500/50";
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none ${classes} ${
        isLoading && disabledStateClasses
      } `}
    >
      {btnText}
    </button>
  );
};

export default Button;
