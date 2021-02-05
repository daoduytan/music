import { FC } from "react";
import { iconPause, iconPlay } from "../../icon";
import { Icon } from "../icon";

interface Props {
  onClick: () => void;
  isPlay?: boolean;
  size?: number;
}

const Play: FC<Props> = ({ size = 40, onClick, isPlay = false }) => {
  const icon = isPlay ? iconPause : iconPlay;
  return (
    <Icon size={size} onClick={onClick}>
      {icon}
    </Icon>
  );
};

export { Play };
