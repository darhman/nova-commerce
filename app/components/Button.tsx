import React from "react";
import * as Icons from "react-icons/fi"; // Import the correct library and alias it as Icons

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  clear?: boolean;
  small?: boolean;
  custom?: string;
  icon?: React.ElementType; // Use React.ElementType for the icon prop
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  clear,
  small,
  custom,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-full
    border-orange-500
    flex
    items-center
    justify-center
    gap-2
    ${clear ? "bg-rose-500" : "bg-orange-500"}
    ${outline ? "bg-orange-500" : "bg-orange-500"}
    ${outline ? "border-slate-500" : "border-orange-500"}
    ${outline ? "text-white" : "text-white"}
    ${small ? "text-sm font-light" : "text-md font-semibold"}
    ${small ? "py-1 px-2 border-1[px]" : "py-3 px-4 border-2"}
    ${custom ? custom : ""}
    `}
    >
      {icon && <Icons.FiSun size={24} />} {label}
    </button>
  );
};

export default Button;
