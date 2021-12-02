import React, { ReactElement } from "react";

type SelectButtonProps = {
  icon: ReactElement;
  title: string;
  selectedValue?: string;
};

export default function SelectButton({
  onClick,
  icon,
  id,
  title,
  selectedValue,
}: SelectButtonProps & React.HTMLProps<HTMLButtonElement>) {
  const isSelected = selectedValue === id;

  const buttonColor = isSelected
    ? "bg-blue-600 text-blue-100 hover:bg-blue-500 hover:border-blue-400"
    : "bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-400";

  return (
    <button
      onClick={onClick}
      className={`${buttonColor} bg-white transition-all  p-2  rounded-md mr-4 border-2 border-blue-200 flex items-center justify-center`}
    >
      <p className="mb-0 mr-2">{title}</p>
      {React.cloneElement(icon, {
        className: "w-5",
      })}
    </button>
  );
}
