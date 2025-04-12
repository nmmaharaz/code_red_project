'use client'
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useForm, SubmitHandler,
  //  Controller

} from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import profilePic from "../../../public/assets/profile-pic.png"
// import Select from "react-select";
import RichTextEiditor from "@/components/rich-text-eiditor";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

type FormData = {
  postType: "blog" | "question";
  content: string;
  tags: { value: string; label: string }[];
};

// Programming Languages Options
// const programmingLanguages = [
//   { value: "javascript", label: "JavaScript" },
//   { value: "python", label: "Python" },
//   { value: "java", label: "Java" },
//   { value: "csharp", label: "C#" },
//   { value: "cpp", label: "C++" },
//   { value: "php", label: "PHP" },
//   { value: "swift", label: "Swift" },
//   { value: "kotlin", label: "Kotlin" },
//   { value: "typescript", label: "TypeScript" },
//   { value: "ruby", label: "Ruby" },
// ];

export default function DrawerContentPage() {
  const { data: session } = useSession();
  const router = useRouter()
  const [selectedPostType, setSelectedPostType] = useState<'blog' | 'question' | null>(null)
  const [editorContent, setEditorContent] = useState<string>("");
  const [imageContent, setImageContent] = useState<string[]>([]);


  const { register, handleSubmit,
    // control,
    reset,
    //  formState: { errors }
  } = useForm<FormData>(); // Pass type to useForm

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(data); // Handle form submission here

      const userQuery = {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        // content: data.content,
        content: editorContent,
        contentImage: imageContent,
        postType: data.postType,
        // tags: data.tags.map(tag => tag.value),
        postedAt: new Date(),
        comments: [],
        likes: [],
        dislikes: [],
      };
      console.log(userQuery);

      // Different API endpoints for different post types
      const apiEndpoint = data.postType === 'blog' ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog` : `${process.env.NEXT_PUBLIC_BASE_URL}/api/question`;

      const { data: dataPost } = await axios.post(apiEndpoint, userQuery)
      console.log(dataPost)
      // Access acknowledged from dataPost
      if (dataPost.acknowledged === true) {
        reset()
        toast.success(`Your ${data?.postType} posted successfully`);
        router.push('/')
      } else {
        toast.error('Failed to post your content');
      }
    } catch (error) {
      console.error('Error posting:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <DrawerContent className=" bg-gray-900 text-white rounded-lg overflow-hidden">
      <div className="overflow-y-auto max-h-[75vh] px-2">
        <DrawerHeader>
          <DrawerTitle className="text-lg text-white text-center font-semibold">Create a Post</DrawerTitle>
          <DrawerDescription className="text-gray-400 text-center">
            Write your blog or ask a question.
          </DrawerDescription>
        </DrawerHeader>

        {/* User Profile Section */}
        <div className="flex justify-center items-center space-x-3 p-4">
          <Image
            src={session?.user?.image || profilePic}
            width={40}
            height={40}
            alt="User Profile"
            className="rounded-full border border-blue-500"
          />
          <div>
            <p className="font-medium">{session?.user?.name}</p>
          </div>
        </div>

        {/* Post Type Selection */}
        <div className="md:flex justify-center items-center pl-10 md:gap-10 space-y-2">
          <label className="flex items-center space-x-2">
            <InteractiveHoverButton className="">
              <input
                type="radio"
                value="blog"
                className="accent-blue-500"
                {...register("postType", { required: true })}
                onChange={() => setSelectedPostType('blog')}
              />
              <span>📖 Make a Blog Post</span>
            </InteractiveHoverButton>
          </label>
          <label className="flex items-center space-x-2">
            <InteractiveHoverButton className="">
              <input
                type="radio"
                value="question"
                className="accent-green-500"
                {...register("postType", { required: true })}
                onChange={() => setSelectedPostType('question')}
              />
              <span>❓ Ask a Question</span>
            </InteractiveHoverButton>
          </label>
        </div>
        <div>
          {/* Multi-Select for Tags */}
          {/* <div className="p-4 ">
            <label className="block text-gray-300 mb-2 w-[80vw] mx-auto">Select Programming Languages</label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={programmingLanguages}
                  isMulti
                  className="w-[80vw] mx-auto text-black"
                  placeholder="Choose languages..."
                />
              )}
            />
          </div> */}
        </div>

        {/* Textarea for Post Content */}
        <div className="">

          <RichTextEiditor 
            setContent={setEditorContent} 
            setImageContent={(imageContent) => 
              setImageContent(Array.isArray(imageContent) ? imageContent : [imageContent])
            } 
          />
        </div>

      </div>
      {/* Submit & Cancel Buttons */}
      <DrawerFooter className="px-4">
        {selectedPostType && (
          <Button
            className={` w-[200px] md:w-xl mx-auto py-2 rounded-lg cursor-pointer ${selectedPostType === 'blog' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            onClick={handleSubmit(onSubmit)}
          >
            {selectedPostType === 'blog' ? 'Post Blog' : 'Ask Question'}
          </Button>
        )}




        <DrawerClose asChild>
          <Button className="w-[200px] md:w-xl mx-auto py-2 mt-2 bg-red-600 hover:bg-red-700">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
