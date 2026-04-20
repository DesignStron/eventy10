"use client";

import type { CSSProperties, ReactNode } from "react";

export default function CookieSettingsLink({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => {
        window.dispatchEvent(new Event("open-cookie-settings"));
      }}
    >
      {children}
    </button>
  );
}
