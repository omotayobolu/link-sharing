import { ReactNode } from "react";

type ButtonPropType = {
  children: ReactNode;
  handleClick: () => void;
  className: string;
  type: "button" | "submit";
  disabled: any;
};

const PrimaryButton = (props: ButtonPropType) => {
  return (
    <button
      className={`font-semibold text-base leading-[150%] border border-transparent rounded-lg bg-primary-purple text-white px-[27px] py-[11px] ${props.className}`}
      onClick={props.handleClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
