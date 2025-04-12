"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Edit3 } from "lucide-react"

interface BioEditorProps {
  initialBio: string
  initialAbout: string
  email: string
}

export default function BioEditor({ initialBio, initialAbout, email }: BioEditorProps) {
  const [bio, setBio] = useState(initialBio)
  const [about, setAbout] = useState(initialAbout)
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [isEditingAbout, setIsEditingAbout] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          bio,
          about,
        }),
      })

      if (response.ok) {
        toast.success("Profile updated successfully")
        setIsEditingBio(false)
        setIsEditingAbout(false)
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 mt-6">
      {/* Bio Section */}
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Bio</h2>
          <button
            onClick={() => setIsEditingBio(!isEditingBio)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        {isEditingBio ? (
          <div className="space-y-4">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
              rows={3}
              placeholder="Write a short bio about yourself..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditingBio(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 leading-relaxed">
            {bio || "No bio added yet. Click the edit button to add one."}
          </p>
        )}
      </div>

      {/* About Section */}
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-900">About</h2>
          <button
            onClick={() => setIsEditingAbout(!isEditingAbout)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        {isEditingAbout ? (
          <div className="space-y-4">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
              rows={4}
              placeholder="Tell us more about yourself..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditingAbout(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 leading-relaxed">
            {about || "No about section added yet. Click the edit button to add one."}
          </p>
        )}
      </div>
    </div>
  )
} 