"use client";

import { useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";

export default function RecentlyViewedTracker({ slug }: { slug: string }) {
  const { addRecentlyViewed } = useAppState();

  useEffect(() => {
    addRecentlyViewed(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return null;
}
