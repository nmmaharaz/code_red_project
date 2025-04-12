import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import BioEditor from "./components/BioEditor"
import ProfileDetailsEditor from "./components/ProfileDetailsEditor"
import AddPostButton from "./components/AddPostButton"
import dbConnect, {collectionNameObj } from "@/lib/dbConnect"
import BookmarkedBlogs from "./components/BookmarkedBlogs"
import { ObjectId } from "mongodb"
import QuestionTable from "@/components/QuestionBox/QuestionTable/QuestionTable"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) {
    return <div>Please sign in to view your profile</div>
  }

  // Fetch user data from MongoDB
  const userCollection = dbConnect(collectionNameObj.userCollection)
  const userData = await userCollection.findOne({ email: user.email })

  // Fetch user's bookmarks from separate collections
  const blogBookmarksCollection = dbConnect(collectionNameObj.blogBookmarksCollection)
  const questionBookmarksCollection = dbConnect(collectionNameObj.questionBookmarksCollection)

  const blogBookmarks = await blogBookmarksCollection
    .find({ userEmail: user.email })
    .toArray()
  const questionBookmarks = await questionBookmarksCollection
    .find({ userEmail: user.email })
    .toArray()

  // Fetch bookmarked blogs
  const blogCollection = dbConnect(collectionNameObj.blogCollection)
  const bookmarkedBlogs = await blogCollection
    .find({ _id: { $in: blogBookmarks.map(b => new ObjectId(b.postId)) } })
    .sort({ postedAt: -1 })
    .toArray()

  // Fetch bookmarked questions
  const questionCollection = dbConnect(collectionNameObj.questionCollection)
  const bookmarkedQuestions = await questionCollection
    .find({ _id: { $in: questionBookmarks.map(b => new ObjectId(b.postId)) } })
    .sort({ postedAt: -1 })
    .toArray()

  // Transform blog data to match expected type
  const transformedBlogs = bookmarkedBlogs.map(blog => ({
    _id: blog._id.toString(),
    content: blog.content || "",
    tags: blog.tags || [],
    name: blog.name || "",
    postedAt: blog.postedAt || new Date().toISOString(),
    likes: blog.likes || [],
    dislikes: blog.dislikes || [],
    image: blog.image || "",
    comments: blog.comments || []
  }))

  // Transform question data to match expected type
  const transformedQuestions = bookmarkedQuestions.map(question => ({
    _id: question._id.toString(),
    content: question.content || "",
    tags: question.tags || [],
    name: question.name || "",
    postedAt: question.postedAt || new Date().toISOString(),
    likes: question.likes || [],
    dislikes: question.dislikes || []
  }))

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ProfileDetailsEditor
            initialData={{
              coverPicture: userData?.coverPicture || "",
              location: userData?.location || "",
              website: userData?.website || "",
              twitter: userData?.twitter || "",
              instagram: userData?.instagram || "",
              linkedin: userData?.linkedin || "",
            }}
            email={user.email || ""}
            name={user.name || ""}
            image={user.image || ""}
          />

          <div className="px-8 py-6">
            {/* Add Post Button */}
            <div className="flex justify-end mb-12">
              <AddPostButton />
            </div>

            {/* Bio and About Sections */}
            <BioEditor
              initialBio={userData?.bio || ""}
              initialAbout={userData?.about || ""}
              email={user.email || ""}
            />

            {/* Bookmarked Questions */}
            {transformedQuestions.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookmarked Questions</h2>
                <QuestionTable cardData={transformedQuestions} />
              </div>
            )}

            {/* Bookmarked Blogs */}
            {transformedBlogs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookmarked Blogs</h2>
                <BookmarkedBlogs blogs={transformedBlogs} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
