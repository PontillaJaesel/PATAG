import { useEffect, useState } from "react";

type OfficialReactionCounts = {
  likes: number;
  dislikes: number;
};

type OfficialReaction = "like" | "dislike" | null;

function readReaction(officialId: string): OfficialReaction {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(`official-reaction:${officialId}`);
    return raw === "like" || raw === "dislike" ? raw : null;
  } catch {
    return null;
  }
}

function writeReaction(officialId: string, reaction: OfficialReaction) {
  if (reaction) {
    window.localStorage.setItem(`official-reaction:${officialId}`, reaction);
  } else {
    window.localStorage.removeItem(`official-reaction:${officialId}`);
  }
}

export function useOfficialReactions(officialId: string) {
  const [reaction, setReaction] = useState<OfficialReaction>(null);

  useEffect(() => {
    setReaction(readReaction(officialId));
  }, [officialId]);

  const incrementLike = () => {
    setReaction((current) => {
      const next = current === "like" ? null : "like";
      writeReaction(officialId, next);
      return next;
    });
  };

  const incrementDislike = () => {
    setReaction((current) => {
      const next = current === "dislike" ? null : "dislike";
      writeReaction(officialId, next);
      return next;
    });
  };

  const likes = reaction === "like" ? 1 : 0;
  const dislikes = reaction === "dislike" ? 1 : 0;

  return {
    likes,
    dislikes,
    incrementLike,
    incrementDislike,
  };
}