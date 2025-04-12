import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import dbConnect, {collectionNameObj } from "@/lib/dbConnect"
import BlogBox from "@/app/profile/components/BookmarkedBlogs"

import { ObjectId } from "mongodb"
import QuestionBoxFooter from "@/components/QuestionBox/QuestionBoxFooter/QuestionBoxFooter"

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) {
    return <div>Please sign in to view your bookmarks</div>
  }

  // Fetch user's bookmarks from separate collections
  const blogBookmarksCollection = dbConnect(collectionNameObj.blogBookmarksCollection)
  const questionBookmarksCollection = dbConnect(collectionNameObj.questionBookmarksCollection)

  const blogBookmarks = await blogBookmarksCollection
    .find({ userEmail: user?.email })
    .toArray()
  const questionBookmarks = await questionBookmarksCollection
    .find({ userEmail: user?.email })
    .toArray()

  // Fetch bookmarked blogs
  const blogCollection = dbConnect(collectionNameObj.blogCollection)
  const bookmarkedBlogs = await blogCollection
    .find({ _id: { $in: blogBookmarks?.map(b => new ObjectId(b.postId)) } })
    .sort({ postedAt: -1 })
    .toArray()

  // Fetch bookmarked questions
  const questionCollection = dbConnect(collectionNameObj.questionCollection)
  const bookmarkedQuestions = await questionCollection
    .find({ _id: { $in: questionBookmarks?.map(b => new ObjectId(b.postId)) } })
    .sort({ postedAt: -1 })
    .toArray()

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Bookmarked Blogs */}
        {bookmarkedBlogs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Bookmarked Blogs</h2>
            <div className="space-y-6">
              {bookmarkedBlogs?.map((blog) => (
                <BlogBox key={blog._id} card={blog} />
              ))}
            </div>
          </div>
        )}

        {/* Bookmarked Questions */}
        {bookmarkedQuestions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Bookmarked Questions</h2>
            <div className="space-y-6">
              {bookmarkedQuestions?.map((question) => (
                <QuestionBoxFooter key={question._id.toString()} card={question} />
              ))}
            </div>
          </div>
        )}

        {/* No Bookmarks Message */}
        {bookmarkedBlogs.length === 0 && bookmarkedQuestions.length === 0 && (
          <div className="text-center text-gray-400">
            <p className="text-lg">You haven&apos;t bookmarked any posts yet.</p>
            <p className="mt-2">Start bookmarking blogs and questions to see them here!</p>
          </div>
        )}
      </div>
    </div>
  )
} 