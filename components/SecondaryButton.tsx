import { ReactNode } from "react";

type ButtonPropType = {
  children: ReactNode;
  handleClick: () => void;
  className: string;
  type: "button" | "submit";
};

const SecondaryButton = (props: ButtonPropType) => {
  return (
    <button
      className={`font-semibold text-base border border-primary-purple rounded-lg text-primary-purple bg-white px-[27px] py-[11px] ${props.className}`}
      onClick={props.handleClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default SecondaryButton;
