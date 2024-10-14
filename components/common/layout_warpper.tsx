import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function LayoutWrapper({ children }: Props) {
  return (
    <div className="min-h-screen  w-screen bg-slate-800 flex items-center justify-center px-5 py-3">
      {children}
    </div>
  );
}

export default LayoutWrapper;
