"use client"

import { useState } from "react"
import DrawerContentPage from "@/components/HomeCenter/AllDrawerThings/DrawerContentPage"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function AddPostButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add Post
        </Button>
      </DrawerTrigger>
      <DrawerContentPage />
    </Drawer>
  )
}