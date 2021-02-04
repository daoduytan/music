import React, { FC, useRef, useState } from "react";
import { useClickOutside } from "../../hooks";
import { iconDots } from "../../icon";
import { IMusic, ISong } from "../../interface";
import { Icon } from "../icon";
import { ActionModal } from "./action-modal";

interface Props {
  song: ISong | IMusic;
}

const Action: FC<Props> = ({ song }) => {
  const ref = useRef<any>();
  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => setVisible(!visible);

  useClickOutside(ref, () => setVisible(false));

  return (
    <div>
      <Icon onClick={toggle}>{iconDots}</Icon>
      {visible && (
        <div ref={ref}>
          <ActionModal song={song} toggle={toggle} />
        </div>
      )}
    </div>
  );
};
export { Action };
