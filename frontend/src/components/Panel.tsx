import React, { FC, ReactNode } from "react";

interface Props {
  title?: string;
  children?: ReactNode;
}

const Panel: FC<Props> = ({ title = "Panel", children = <></> }) => {
  return (
    <div
      className="flex flex-col w-full bg-white shadow-lg rounded border 
      border-gray-200 overflow-hidden"
    >
      <h4 className="px-4 py-2 bg-gray-100">{title}</h4>
      <div className="flex flex-col p-4">{children}</div>
    </div>
  );
};

export default Panel;
