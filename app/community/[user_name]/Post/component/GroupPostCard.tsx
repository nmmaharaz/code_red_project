
import Image from "next/image";
import { FaThumbsUp, FaCommentAlt, FaShare } from "react-icons/fa";

export default function GroupPostCard() {
  return (
    <div className="mt-4 bg-white rounded-lg shadow p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://placehold.co/40x40"
            alt="User avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800">Lori Ferguson</p>
            <p className="text-sm text-gray-500">
              Web Developer at StackBros • <span>2hr</span>
            </p>
          </div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
          ...
        </button>
      </div>

      <div className="mt-4 text-gray-700">
        I&#39;m thrilled to share that I&#39;ve completed a graduate certificate course
        in project management with the president&#39;s honor roll.
      </div>

      <div className="mt-4 rounded-lg overflow-hidden">
        <Image
          src="https://i.ibb.co.com/n8K068rc/Screenshot-3.png"
          alt="Post content"
          width={800}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mt-4 border-t pt-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-blue-600">
            <FaThumbsUp /> Liked (56)
          </span>
          <span className="flex items-center gap-1">
            <FaCommentAlt /> Comments (12)
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FaShare /> Share (3)
        </div>
      </div>

      {/* Comment Input */}
      <div className="flex items-start gap-3 mt-4">
        <Image
          src="https://placehold.co/40x40"
          alt="Your avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
        <textarea
          placeholder="Add a comment..."
          className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none resize-none"
        />
      </div>

      {/* Comments Section */}
      <div className="mt-4 space-y-3 text-sm text-gray-700">
        {/* Comment 1 */}
        <div>
          <div className="flex items-start gap-3">
            <Image
              src="https://placehold.co/40x40"
              alt="Commenter"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div className="bg-gray-100 p-3 rounded-xl w-full">
              <p className="font-semibold text-gray-800">Frances Guerrero</p>
              <p className="mt-1 text-gray-600">
                Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.
              </p>
              <div className="text-xs text-gray-500 mt-2 flex gap-4">
                <span>Like (3)</span>
                <span>Reply</span>
                <span>View 5 replies</span>
                <span className="ml-auto">5hr</span>
              </div>
            </div>
          </div>

          {/* Nested Reply 1 */}
          <div className="ml-12 mt-3">
            <div className="flex items-start gap-3">
              <Image
                src="https://placehold.co/40x40"
                alt="Reply"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="bg-gray-100 p-3 rounded-xl w-full">
                <p className="font-semibold text-gray-800">Lori Stevens</p>
                <p className="mt-1 text-gray-600">
                  See resolved goodness felicity shy civility domestic had but drawings offended yet answered Jennings perceive.
                </p>
                <div className="text-xs text-gray-500 mt-2 flex gap-4">
                  <span>Like (5)</span>
                  <span>Reply</span>
                  <span className="ml-auto">2hr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nested Reply 2 */}
          <div className="ml-16 mt-3">
            <div className="flex items-start gap-3">
              <Image
                src="https://placehold.co/40x40"
                alt="Reply"
                width={28}
                height={28}
                className="rounded-full"
              />
              <div className="bg-gray-100 p-3 rounded-xl w-full">
                <p className="font-semibold text-gray-800">Billy Vasquez</p>
                <p className="mt-1 text-gray-600">
                  Wishing calling is warrant settled was lucky.
                </p>
                <div className="text-xs text-gray-500 mt-2 flex gap-4">
                  <span>Like</span>
                  <span>Reply</span>
                  <span className="ml-auto">15min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Load More Replies */}
          <p className="text-xs text-gray-400 ml-14 mt-2">... Load more replies</p>
        </div>

        {/* Another top-level comment */}
        <div className="flex items-start gap-3">
          <Image
            src="https://placehold.co/40x40"
            alt="Commenter"
            width={36}
            height={36}
            className="rounded-full"
          />
          <div className="bg-gray-100 p-3 rounded-xl w-full">
            <p className="font-semibold text-gray-800">Frances Guerrero</p>
            <p className="mt-1 text-gray-600">
              Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.
            </p>
            <div className="text-xs text-gray-500 mt-2 flex gap-4">
              <span>Like (1)</span>
              <span>Reply</span>
              <span>View 6 replies</span>
              <span className="ml-auto">4min</span>
            </div>
          </div>
        </div>

        {/* Load More Comments */}
        <p className="text-xs text-gray-500 ml-2">• Load more comments</p>
      </div>
    </div>
  );
}
