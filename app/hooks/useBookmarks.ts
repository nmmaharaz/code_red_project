import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"

interface BookmarkData {
  postId: string
  type: "blog" | "question"
}

export function useBookmarks() {
  const queryClient = useQueryClient()

  // Fetch bookmarks
  const { data: bookmarks, isLoading: isLoadingBookmarks } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const response = await fetch("/api/bookmarks")
      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks")
      }
      return response.json()
    },
  })
  // Add/Remove bookmark mutation
  const { mutate: toggleBookmark, isPending: isTogglingBookmark } = useMutation({
    mutationFn: async ({ postId, type }: BookmarkData) => {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, type }),
      })
      if (!response.ok) {
        throw new Error("Failed to update bookmark")
      }
      return response.json()
    },
    onSuccess: (data) => {
      // Invalidate and refetch bookmarks
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update bookmark")
    },
  })

  const isBookmarked = (postId: string, type: "blog" | "question") => {
    if (!bookmarks) return false
    const bookmarksList = type === "blog" ? bookmarks.blogBookmarks : bookmarks.questionBookmarks
    return bookmarksList.includes(postId)
  }

  return {
    bookmarks,
    isLoadingBookmarks,
    isTogglingBookmark,
    isBookmarked,
    toggleBookmark,
  }
} 