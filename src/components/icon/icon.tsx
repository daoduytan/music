import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  size?: number;
  onClick?: () => void;
}
const Icon: FC<Props> = ({ children, size = 20, onClick, ...props }) => {
  const style = {
    height: size,
    width: size,
  };

  return (
    <div
      className="inline-block"
      {...props}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { Icon };
