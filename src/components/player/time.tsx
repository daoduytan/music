import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Time: FC<Props> = ({ children }) => {
  return <div style={{ width: 60, textAlign: "center" }}>{children}</div>;
};

export { Time };
