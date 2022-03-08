import React, { ComponentPropsWithoutRef, ReactElement, forwardRef } from "react";

import cn from "classnames";

import "./styles.module.scss";

export interface LayoutProps extends ComponentPropsWithoutRef<"div"> {
  top?: ReactElement;
  side?: ReactElement;
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { children, top, side, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("mfe-layout", { "mfe-layout--narrow": !side }, className)}
      {...props}
    >
      {top}
      <div className="mfe-layout__container">
        {side ? <div className="mfe-layout__aside">{side}</div> : null}
        <div className="mfe-layout__main">{children}</div>
      </div>
    </div>
  );
});
