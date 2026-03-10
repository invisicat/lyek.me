"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProvider as ConvexProviderBase } from "convex/react";
import { ReactNode, useMemo } from "react";

interface Props {
  children: ReactNode;
}

export default function ConvexProvider({ children }: Props) {
  const client = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      return null;
    }
    return new ConvexReactClient(url);
  }, []);

  if (!client) {
    return <>{children}</>;
  }

  return <ConvexProviderBase client={client}>{children}</ConvexProviderBase>;
}
