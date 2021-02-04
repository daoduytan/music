import React, { FC } from "react";

const Loading: FC = () => {
  return (
    <div
      className="relative w-16 h-16 rounded-full border-4 border-bg-green-500"
      style={{ background: "pink" }}
    >
      <div className="absolute  left-0 right-0 w-16 h-16 rounded-full border-t-4 border-t-bg-green-500" />
    </div>
  );
};

export { Loading };
