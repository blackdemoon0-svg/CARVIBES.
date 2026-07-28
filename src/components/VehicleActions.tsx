"use client";

import { useAppState } from "@/context/AppStateContext";
import { googleImagesUrl } from "@/data/vehicles";

// IMPORTANT: These are plain native <a> anchor tags — no onClick handlers,
// no preventDefault(), no window.open(), no router navigation, no iframe,
// and no embedded preview of any kind. The browser handles the external
// navigation natively in a new tab, exactly like any normal hyperlink.

export function GalleryButton({ searchQuery, label = "View Gallery" }: { searchQuery: string; label?: string }) {
  return (
    <a
      href={googleImagesUrl(searchQuery)}
      target="_blank"
      rel="noopener noreferrer"
      className="cv-btn cv-btn-ghost px-3 py-2 text-xs"
      title={`Open Google Images for ${searchQuery}`}
    >
      🖼️ {label}
    </a>
  );
}

export function ImagesButton({ searchQuery, label = "View Images" }: { searchQuery: string; label?: string }) {
  return (
    <a
      href={googleImagesUrl(searchQuery)}
      target="_blank"
      rel="noopener noreferrer"
      className="cv-btn cv-btn-ghost px-3 py-2 text-xs"
      title={`Open Google Images for ${searchQuery}`}
    >
      📷 {label}
    </a>
  );
}

export function FavoriteButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { isFavorite, toggleFavorite } = useAppState();
  const active = isFavorite(slug);
  return (
    <button
      onClick={() => toggleFavorite(slug)}
      className={`cv-btn px-3 py-2 text-xs ${active ? "cv-btn-gold" : "cv-btn-ghost"} ${className}`}
    >
      {active ? "★ Favorited" : "☆ Favorite"}
    </button>
  );
}

export function CompareButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { isInCompare, toggleCompare, compareList } = useAppState();
  const active = isInCompare(slug);
  const disabled = !active && compareList.length >= 3;
  return (
    <button
      onClick={() => toggleCompare(slug)}
      disabled={disabled}
      className={`cv-btn px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "cv-btn-electric" : "cv-btn-ghost"
      } ${className}`}
      title={disabled ? "You can compare up to 3 vehicles" : "Add to comparison"}
    >
      {active ? "✓ In Compare" : "⇄ Compare"}
    </button>
  );
}
