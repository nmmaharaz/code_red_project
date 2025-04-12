"use client";

import dynamic from 'next/dynamic';

const CodeEditor = dynamic(
  () => import('../code-editor/components/CodeEditor').then(mod => mod.CodeEditor),
  { ssr: false } // This will disable server-side rendering for this component
);

export default function CodeEditorPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <CodeEditor />
    </div>
  );
} 
