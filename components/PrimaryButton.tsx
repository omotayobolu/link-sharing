import { ReactNode } from "react";

type ButtonPropType = {
  children: ReactNode;
  handleClick: () => void;
  className: string;
  type: "button" | "submit";
  disabled: boolean;
};

const PrimaryButton = (props: ButtonPropType) => {
  return (
    <button
      className={`font-semibold text-base leading-[150%] border border-transparent rounded-lg bg-primary-purple text-white px-[27px] py-[11px] disabled:opacity-25  disabled:cursor-not-allowed hover:bg-secondary-purple ${props.className}`}
      onClick={props.handleClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
