import { useEffect, useState } from "react";

const BOOKMARKS_UPDATED_EVENT = "patag:bookmarks-updated";
const OFFICIALS_BOOKMARK_KEY = "patag.bookmarks.officials";
const AGENCIES_BOOKMARK_KEY = "patag.bookmarks.agencies";

export type BookmarkedOfficial = {
  id: number;
  name: string;
  title: string;
  branch: string;
  location: string;
  photo: string;
};

export type BookmarkedAgency = {
  id: number;
  name: string;
  acronym: string;
  kind: string;
  headquarters: string;
  description: string;
};

type BookmarkCollection = "officials" | "agencies";

const collectionKeys: Record<BookmarkCollection, string> = {
  officials: OFFICIALS_BOOKMARK_KEY,
  agencies: AGENCIES_BOOKMARK_KEY,
};

function readBookmarks<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function writeBookmarks<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new Event(BOOKMARKS_UPDATED_EVENT));
}

function normalizeId(id: number | string) {
  return String(id);
}

export function useBookmarks<T>(collection: BookmarkCollection) {
  const key = collectionKeys[collection];
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const sync = () => setItems(readBookmarks<T>(key));
    sync();

    window.addEventListener("storage", sync);
    window.addEventListener(BOOKMARKS_UPDATED_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(BOOKMARKS_UPDATED_EVENT, sync);
    };
  }, [key]);

  return items;
}

export function useBookmarkToggle<T extends { id: number }>(
  collection: BookmarkCollection,
  item: T,
) {
  const key = collectionKeys[collection];
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const sync = () => {
      const current = readBookmarks<T>(key);
      setBookmarked(current.some((entry) => normalizeId(entry.id) === normalizeId(item.id)));
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(BOOKMARKS_UPDATED_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(BOOKMARKS_UPDATED_EVENT, sync);
    };
  }, [key, item.id]);

  const toggle = () => {
    const current = readBookmarks<T>(key);
    const exists = current.some((entry) => normalizeId(entry.id) === normalizeId(item.id));
    const next = exists
      ? current.filter((entry) => normalizeId(entry.id) !== normalizeId(item.id))
      : [...current, item];

    writeBookmarks(key, next);
    setBookmarked(!exists);
  };

  return { bookmarked, toggle };
}
