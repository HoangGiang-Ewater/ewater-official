"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({ children, ...props }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default ThemeProvider;
