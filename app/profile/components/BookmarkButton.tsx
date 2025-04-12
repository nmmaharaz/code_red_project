"use client"

import { useBookmarks } from "@/app/hooks/useBookmarks"
import { BookmarkIcon } from "@heroicons/react/24/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"

interface BookmarkButtonProps {
  postId: string
  type: "blog" | "question"
}

export default function BookmarkButton({ postId, type }: BookmarkButtonProps) {
  const { isBookmarked, isTogglingBookmark, toggleBookmark } = useBookmarks()

  const handleBookmark = () => {
    toggleBookmark({ postId, type })
  }

  return (
    <button
      onClick={handleBookmark}
      disabled={isTogglingBookmark}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
        isBookmarked(postId, type) ? "text-blue-500" : "text-gray-500"
      }`}
    >
      {isBookmarked(postId, type) ? (
        <BookmarkIconSolid className="w-5 h-5" />
      ) : (
        <BookmarkIcon className="w-5 h-5" />
      )}
    </button>
  )
} 