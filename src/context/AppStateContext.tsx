"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface AppState {
  favorites: string[];
  compareList: string[];
  recentlyViewed: string[];
  savedComparisons: string[][];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  toggleCompare: (slug: string) => void;
  isInCompare: (slug: string) => boolean;
  clearCompare: () => void;
  addRecentlyViewed: (slug: string) => void;
  saveComparison: (slugs: string[]) => void;
  ready: boolean;
}

const AppStateContext = createContext<AppState | null>(null);

const KEYS = {
  favorites: "carvibes:favorites",
  compare: "carvibes:compare",
  recent: "carvibes:recent",
  saved: "carvibes:savedComparisons",
};

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function readNestedList(key: string): string[][] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[][]) : [];
  } catch {
    return [];
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<string[][]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(readList(KEYS.favorites));
    setCompareList(readList(KEYS.compare));
    setRecentlyViewed(readList(KEYS.recent));
    setSavedComparisons(readNestedList(KEYS.saved));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(KEYS.favorites, JSON.stringify(favorites));
  }, [favorites, ready]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(KEYS.compare, JSON.stringify(compareList));
  }, [compareList, ready]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(KEYS.recent, JSON.stringify(recentlyViewed));
  }, [recentlyViewed, ready]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(KEYS.saved, JSON.stringify(savedComparisons));
  }, [savedComparisons, ready]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites]);

  const toggleCompare = useCallback((slug: string) => {
    setCompareList((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  }, []);

  const isInCompare = useCallback((slug: string) => compareList.includes(slug), [compareList]);

  const clearCompare = useCallback(() => setCompareList([]), []);

  const addRecentlyViewed = useCallback((slug: string) => {
    setRecentlyViewed((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)];
      return next.slice(0, 12);
    });
  }, []);

  const saveComparison = useCallback((slugs: string[]) => {
    setSavedComparisons((prev) => [slugs, ...prev].slice(0, 10));
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      compareList,
      recentlyViewed,
      savedComparisons,
      toggleFavorite,
      isFavorite,
      toggleCompare,
      isInCompare,
      clearCompare,
      addRecentlyViewed,
      saveComparison,
      ready,
    }),
    [
      favorites,
      compareList,
      recentlyViewed,
      savedComparisons,
      toggleFavorite,
      isFavorite,
      toggleCompare,
      isInCompare,
      clearCompare,
      addRecentlyViewed,
      saveComparison,
      ready,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
