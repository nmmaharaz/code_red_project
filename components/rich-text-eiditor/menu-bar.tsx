import {
    AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3,
    Image as ImageIcon,
    //  Highlighter, 
    Italic, List, ListOrdered, Strikethrough
} from 'lucide-react';
import React from 'react'
import { Toggle } from '../ui/toggle';
import { Editor } from '@tiptap/react'
import toast from 'react-hot-toast';
import axios from 'axios';

export default function MenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) {
        return null
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;


        // FormData object to send the file to ImgBB
        const formData = new FormData()
        formData.append('image', file)

        const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!API_KEY) {
            console.error('API Key not found');
            return;
        }

        // Posting the image
        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData)
            const result = res.data
            if (result?.data?.url) {
                // Insert the image URL into the editor
                editor.chain().focus().setImage({ src: result.data.url }).run();

                // Display success message using React Hot Toast
                toast.success('Image uploaded successfully!');
            } else {
                toast.error('Image upload failed!');
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Failed to upload Image. Please try again: ${error.message}`);
            } else {
                toast.error("Failed to upload Image. Please try again");
            }
        }
    }




    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            preesed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            preesed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            preesed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            preesed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            preesed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            preesed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            preesed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            preesed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            preesed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            preesed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            preesed: editor.isActive("orderedList"),
        },
        {
            icon: <ImageIcon className="size-4" />,
            onClick: () => document.getElementById('image-upload')?.click(), // Trigger file input click
            pressed: false,
        },
    ];

    return (
        <div className="max-w-[80vw] mx-auto border rounded-md p-1 mb-1 bg-slate-800 space-x-2 z-50">
            {Options.map((option, index) => (
                <Toggle
                    key={index}
                    pressed={option.preesed}
                    onPressedChange={option.onClick}
                >
                    {option.icon}
                </Toggle>
            ))}
            {/* Hidden file input to select image */}
            <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            />
        </div>
    )
}
