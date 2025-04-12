"use client";

import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';

export default function FloatingButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/code-editor'); // Navigate to the code editor route
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
    >
      <Play className="w-6 h-6" />
    </button>
  );
} 