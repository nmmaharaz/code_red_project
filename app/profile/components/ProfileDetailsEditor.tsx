"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Edit3, Camera, MapPin, Link as LinkIcon, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

interface ProfileDetailsEditorProps {
  initialData: {
    coverPicture: string
    location: string
    website: string
    twitter: string
    instagram: string
    linkedin: string
  }
  email: string
  name: string
  image: string
}

export default function ProfileDetailsEditor({ initialData, email, name, image }: ProfileDetailsEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [coverPicture, setCoverPicture] = useState(initialData.coverPicture || "")
  const [location, setLocation] = useState(initialData.location || "")
  const [website, setWebsite] = useState(initialData.website || "")
  const [twitter, setTwitter] = useState(initialData.twitter || "")
  const [instagram, setInstagram] = useState(initialData.instagram || "")
  const [linkedin, setLinkedin] = useState(initialData.linkedin || "")

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
          coverPicture,
          location,
          website,
          twitter,
          instagram,
          linkedin,
        }),
      })

      if (response.ok) {
        toast.success("Profile updated successfully")
        setIsEditing(false)
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

  const handleCoverPictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        setIsLoading(true)
        // Convert file to base64
        const reader = new FileReader()
        reader.onloadend = async () => {
          const base64String = reader.result as string
          setCoverPicture(base64String)
          
          // Save immediately to MongoDB
          const response = await fetch("/api/profile", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              coverPicture: base64String,
            }),
          })

          if (response.ok) {
            toast.success("Cover picture updated successfully")
          } else {
            toast.error("Failed to update cover picture")
          }
          setIsLoading(false)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Error processing image:', error)
        toast.error('Failed to process image')
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Cover Picture */}
      <div className="relative h-60 bg-gradient-to-r from-blue-400 to-purple-500">
        {coverPicture && (
          <Image
            src={coverPicture}
            alt="Cover"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        )}
        <div className="absolute bottom-4 right-4">
          <label className="bg-white/20 hover:bg-white/30 transition-colors rounded-full p-2 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverPictureChange}
              className="hidden"
            />
            <Camera className="w-5 h-5 text-white" />
          </label>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="px-8 py-6 relative">
        {/* Profile Picture */}
        <div className="absolute -top-20 left-8">
          <div className="relative">
            <Image
              src={image || "/default-avatar.png"}
              alt={name || "User"}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
              <Edit3 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Name and Social Links */}
        <div className="mt-16 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          </div>

          {/* Location and Links */}
          <div className="flex flex-wrap gap-4 text-gray-600">
            {isEditing ? (
              <>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Add website"
                    className="border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Twitter className="w-4 h-4" />
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="Add Twitter"
                    className="border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Instagram className="w-4 h-4" />
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="Add Instagram"
                    className="border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="Add LinkedIn"
                    className="border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                  />
                </div>
              </>
            ) : (
              <>
                {location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                  </div>
                )}
                {website && (
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" />
                    <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      {website}
                    </a>
                  </div>
                )}
                {twitter && (
                  <div className="flex items-center gap-1">
                    <Twitter className="w-4 h-4" />
                    <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      {twitter}
                    </a>
                  </div>
                )}
                {instagram && (
                  <div className="flex items-center gap-1">
                    <Instagram className="w-4 h-4" />
                    <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      {instagram}
                    </a>
                  </div>
                )}
                {linkedin && (
                  <div className="flex items-center gap-1">
                    <Linkedin className="w-4 h-4" />
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Edit Button for Social Links */}
          <div className="flex justify-end">
            {isEditing ? (
              <div className="space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
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
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 