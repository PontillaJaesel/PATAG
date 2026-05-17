import { useState, useEffect } from "react";

export function useBillActions(billId: string) {
  const [vote, setVoteState] = useState<'up' | 'down' | null>(null);
  const [bookmarked, setBookmarkedState] = useState(false);

  // Load the saved state when the component mounts
  useEffect(() => {
    const savedVote = localStorage.getItem(`vote_${billId}`);
    const savedBookmark = localStorage.getItem(`bookmark_${billId}`);
    if (savedVote === 'up' || savedVote === 'down') setVoteState(savedVote);
    if (savedBookmark === 'true') setBookmarkedState(true);
  }, [billId]);

  // Save the new state whenever the user clicks a button
  const setVote = (newVote: 'up' | 'down' | null) => {
    setVoteState(newVote);
    if (newVote) localStorage.setItem(`vote_${billId}`, newVote);
    else localStorage.removeItem(`vote_${billId}`);
  };

  const setBookmarked = (val: boolean) => {
    setBookmarkedState(val);
    localStorage.setItem(`bookmark_${billId}`, String(val));
  };

  return { vote, setVote, bookmarked, setBookmarked };
}