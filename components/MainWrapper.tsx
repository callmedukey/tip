import React from "react";
import HeaderCushion from "./HeaderCushion";

const MainWrapper = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <main className={className}>
      <HeaderCushion />
      {children}
    </main>
  );
};

export default MainWrapper;
