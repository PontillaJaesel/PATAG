import { useState, useEffect } from "react";
import { type BookmarkedBill } from "@/lib/bookmarks";

const BOOKMARKS_UPDATED_EVENT = "patag:bookmarks-updated";
const BILLS_BOOKMARK_KEY = "patag.bookmarks.bills";

function readBillBookmarks(): BookmarkedBill[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BILLS_BOOKMARK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeBillBookmarks(items: BookmarkedBill[]) {
  localStorage.setItem(BILLS_BOOKMARK_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(BOOKMARKS_UPDATED_EVENT));
}

export function useBillActions(billId: string, billData?: Omit<BookmarkedBill, "id">) {
  const [vote, setVoteState] = useState<"up" | "down" | null>(null);
  const [bookmarked, setBookmarkedState] = useState(false);

  useEffect(() => {
    const sync = () => {
      const savedVote = localStorage.getItem(`vote_${billId}`);
      if (savedVote === "up" || savedVote === "down") setVoteState(savedVote);
      const current = readBillBookmarks();
      setBookmarkedState(current.some((b) => b.id === billId));
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(BOOKMARKS_UPDATED_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(BOOKMARKS_UPDATED_EVENT, sync);
    };
  }, [billId]);

  const setVote = (newVote: "up" | "down" | null) => {
    setVoteState(newVote);
    if (newVote) localStorage.setItem(`vote_${billId}`, newVote);
    else localStorage.removeItem(`vote_${billId}`);
  };

  const setBookmarked = (val: boolean) => {
  console.log("setBookmarked called", { val, billId, billData });
  const current = readBillBookmarks();
  console.log("current bookmarks before save", current);
  const next = val && billData
    ? [...current, { id: billId, ...billData } as BookmarkedBill]
    : current.filter((b) => b.id !== billId);
  console.log("next bookmarks to save", next);
  writeBillBookmarks(next);
  setBookmarkedState(val);
};

  return { vote, setVote, bookmarked, setBookmarked };
}