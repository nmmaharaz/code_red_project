'use client'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Edit } from 'lucide-react'
import React from 'react'

export default function EditSection() {
    const handleEdit = async () => {
        console.log("Edit")
    }
    return (
        <>
            <DropdownMenuItem
                onClick={handleEdit}
                className="flex items-center space-x-2 hover:bg-gray-100 p-2 cursor-pointer">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
            </DropdownMenuItem>
        </>
    )
}
