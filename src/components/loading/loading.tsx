import React, { FC } from "react";
import "./loading.css";

interface Props {
  full?: boolean;
}

const Loading: FC<Props> = ({ full }) => {
  return (
    <div className="relative w-16 h-16 rounded-full border-4 border-bg-green-500">
      <div className="loader" />
    </div>
  );
};

export { Loading };
