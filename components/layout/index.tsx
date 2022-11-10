import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return <div className="h-screen w-screen p-2 font-mono">{children}</div>;
};

export default Layout;
