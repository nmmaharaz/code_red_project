// "use client";

// import { useState, useEffect, useRef } from "react";
// import dynamic from 'next/dynamic';
// import { Play, ChevronDown, Terminal, Loader2 } from "lucide-react";

// // Dynamically import the Editor component with SSR disabled
// const MonacoEditor = dynamic(
//   () => import('@monaco-editor/react').then(mod => mod.default),
//   { ssr: false, loading: () => (
//     <div className="flex items-center justify-center h-[60vh] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
//       <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//         <Loader2 className="w-4 h-4 animate-spin" />
//         Loading editor...
//       </div>
//     </div>
//   )}
// );

// const languages = [
//   { value: "javascript", label: "JavaScript" },
//   { value: "typescript", label: "TypeScript" },
//   { value: "python", label: "Python" },
//   { value: "html", label: "HTML" },
//   { value: "css", label: "CSS" },
//   { value: "json", label: "JSON" },
// ];

// const themes = [
//   { value: "vs-dark", label: "Dark" },
//   { value: "light", label: "Light" },
// ];

// // Define type for Pyodide
// // interface Pyodide {
// //   runPython: (code: string) => any;
// //   runPythonAsync: (code: string) => Promise<any>;
// // }

// export function CodeEditor() {
//   const [mounted, setMounted] = useState(false);
//   const [language, setLanguage] = useState("javascript");
//   const [theme, setTheme] = useState("vs-dark");
//   const [code, setCode] = useState(`// Start coding here\nconsole.log("Hello, world!");`);
//   const [isRunning, setIsRunning] = useState(false);
//   const [output, setOutput] = useState<string[]>([]);
//   const [showOutput, setShowOutput] = useState(true);
//   const [pyodide, setPyodide] = useState(null);
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   // Initialize Pyodide for Python execution
//   useEffect(() => {
//     if (language === "python" && !pyodide) {
//       const loadPyodideScript = () => {
//         setOutput(prev => [...prev, "⏳ Loading Python runtime..."]);
        
//         // Create a script element for Pyodide
//         const script = document.createElement('script');
//         script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
//         script.crossOrigin = 'anonymous';
        
//         script.onload = async () => {
//           try {
//             // Initialize Pyodide
//             const loadPyodide = (window as any).loadPyodide;
//             const pyodideInstance = await loadPyodide({
//               indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
//             });
            
//             // Test the Pyodide instance
//             await pyodideInstance.runPythonAsync('print("Pyodide loaded successfully!")');
            
//             setPyodide(pyodideInstance);
//             setOutput(prev => [...prev, "✅ Python runtime is ready!"]);
//           } catch (err) {
//             console.error('Pyodide loading error:', err);
//             setOutput(prev => [...prev, `❌ Error loading Python: ${err instanceof Error ? err.message : String(err)}`]);
//           }
//         };
        
//         script.onerror = () => {
//           setOutput(prev => [...prev, "❌ Failed to load Python runtime. Please check your internet connection and try again."]);
//         };
        
//         // Add the script to the document
//         document.head.appendChild(script);
//       };

//       // Load Pyodide
//       loadPyodideScript();
//     }
//   }, [language, pyodide]);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const clearOutput = () => {
//     setOutput([]);
//     if (iframeRef.current) {
//       iframeRef.current.srcdoc = "";
//     }
//   };

//   const handleRun = async () => {
//     setIsRunning(true);
//     setOutput(prev => [...prev, `$ Running ${language} code...`]);
    
//     try {
//       // Clear previous outputs
//       console.clear();
//       if (iframeRef.current && language === "html") {
//         iframeRef.current.srcdoc = "";
//       }

//       // Capture console output
//       const originalConsole = {
//         log: console.log,
//         error: console.error,
//         warn: console.warn,
//         info: console.info,
//       };

//       const captureConsole = (type: 'log' | 'error' | 'warn' | 'info') => {
//         return (...args: unknown[]) => {
//           const message = args.map(arg => 
//             typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
//           ).join(' ');
//           setOutput(prev => [...prev, `[${type}] ${message}`]);
//           originalConsole[type](...args);
//         };
//       };

//       console.log = captureConsole('log');
//       console.error = captureConsole('error');
//       console.warn = captureConsole('warn');
//       console.info = captureConsole('info');

//       try {
//         switch(language) {
//           case 'javascript':
//           case 'typescript':
//             new Function(code)();
//             break;
            
//           case 'python':
//             if (!pyodide) {
//               setOutput(prev => [...prev, "⚠️ Python runtime is not ready. Please wait for it to load..."]);
//               return;
//             }
//             try {
//               // Capture Python's stdout
//               pyodide.runPython(`
//                 import sys
//                 from io import StringIO
//                 sys.stdout = StringIO()
//               `);
              
//               // Run the user's code
//               const result = await pyodide.runPythonAsync(code);
              
//               // Get captured output
//               const stdout = pyodide.runPython("sys.stdout.getvalue()");
//               if (stdout) {
//                 setOutput(prev => [...prev, stdout]);
//               }
              
//               // If there's a return value, show it
//               if (result !== undefined && result !== null) {
//                 setOutput(prev => [...prev, `=> ${result}`]);
//               }
              
//               // Reset stdout
//               pyodide.runPython("sys.stdout = sys.__stdout__");
//             } catch (error) {
//               setOutput(prev => [...prev, `❌ Python Error: ${error instanceof Error ? error.message : String(error)}`]);
//             }
//             break;
            
//           case 'html':
//             if (iframeRef.current) {
//               iframeRef.current.srcdoc = code;
//               setOutput(prev => [...prev, "HTML rendered in preview area"]);
//             }
//             break;
            
//           case 'css':
//             setOutput(prev => [...prev, "CSS would need to be applied to a DOM element"]);
//             break;
            
//           case 'json':
//             try {
//               const parsed = JSON.parse(code);
//               setOutput(prev => [...prev, "Valid JSON:", JSON.stringify(parsed, null, 2)]);
//             } catch (e) {
//               setOutput(prev => [...prev, `JSON Error: ${e instanceof Error ? e.message : 'Invalid JSON'}`]);
//             }
//             break;
            
//           default:
//             setOutput(prev => [...prev, `No execution handler for ${language}`]);
//         }
//       } catch (error) {
//         setOutput(prev => [...prev, `Execution Error: ${error instanceof Error ? error.message : String(error)}`]);
//       }

//       // Restore original console
//       console.log = originalConsole.log;
//       console.error = originalConsole.error;
//       console.warn = originalConsole.warn;
//       console.info = originalConsole.info;

//     } finally {
//       setIsRunning(false);
//       setOutput(prev => [...prev, `$ Execution completed`]);
//     }
//   };

//   if (!mounted) {
//     return (
//       <div className="w-full overflow-hidden border rounded-lg shadow-lg bg-white dark:bg-gray-800">
//         <div className="h-[60vh] flex items-center justify-center">
//           <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//             <Loader2 className="w-4 h-4 animate-spin" />
//             Loading editor...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full overflow-hidden border rounded-lg shadow-lg bg-white dark:bg-gray-800">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b bg-white dark:bg-gray-800 gap-4">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
//           <select 
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="w-full sm:w-[180px] px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//           >
//             {languages.map((lang) => (
//               <option key={lang.value} value={lang.value}>
//                 {lang.label}
//               </option>
//             ))}
//           </select>
//           <select
//             value={theme}
//             onChange={(e) => setTheme(e.target.value)}
//             className="w-full sm:w-[180px] px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//           >
//             {themes.map((t) => (
//               <option key={t.value} value={t.value}>
//                 {t.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex gap-2 w-full sm:w-auto">
//           <button 
//             onClick={clearOutput}
//             disabled={output.length === 0}
//             className="flex-1 text-black sm:flex-none px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Clear Output
//           </button>
//           <button 
//             onClick={handleRun}
//             disabled={isRunning || (language === "python" && !pyodide)}
//             className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium bg-blue-600 text-black rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {isRunning ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Running...
//               </>
//             ) : (
//               <>
//                 <Play className="w-4 h-4" />
//                 Run
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       <div className="relative">
//         <MonacoEditor
//           height="60vh"
//           language={language}
//           theme={theme}
//           value={code}
//           onChange={(value) => setCode(value || "")}
//           options={{
//             minimap: { enabled: false },
//             fontSize: 14,
//             formatOnPaste: true,
//             formatOnType: true,
//             scrollBeyondLastLine: false,
//             smoothScrolling: true,
//             cursorSmoothCaretAnimation: "on",
//             padding: { top: 16, bottom: 16 },
//             lineNumbers: "on",
//             glyphMargin: false,
//             folding: true,
//             automaticLayout: true,
//             bracketPairColorization: {
//               enabled: true,
//             },
//             wordWrap: "on",
//             wrappingStrategy: "advanced",
//           }}
//           beforeMount={(monaco) => {
//             monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
//             monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
//           }}
//         />
//       </div>
      
//       {/* HTML Preview (only shown for HTML) */}
//       {language === "html" && (
//         <div className="border-t">
//           <div className="flex items-center justify-between p-2 text-sm font-medium bg-gray-100 dark:bg-gray-800">
//             <div className="flex items-center">
//               <Terminal className="w-4 h-4 mr-2" />
//               <span>HTML Preview</span>
//             </div>
//           </div>
//           <iframe 
//             ref={iframeRef}
//             className="w-full h-64 border-0 bg-white dark:bg-gray-900"
//             sandbox="allow-scripts allow-same-origin"
//             title="HTML Preview"
//           />
//         </div>
//       )}
      
//       {/* Output Console */}
//       <div className="border-t">
//         <button 
//           className="flex items-center justify-between w-full p-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
//           onClick={() => setShowOutput(!showOutput)}
//         >
//           <div className="flex items-center">
//             <Terminal className="w-4 h-4 mr-2" />
//             <span>Console Output</span>
//             {output.length > 0 && (
//               <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
//                 {output.length}
//               </span>
//             )}
//           </div>
//           <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showOutput ? 'rotate-180' : ''}`} />
//         </button>
//         {showOutput && (
//           <div className="h-[120px] overflow-auto p-2 bg-white dark:bg-gray-900 font-mono text-sm whitespace-pre-wrap">
//             {output.length === 0 ? (
//               <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
//                 Output will appear here...
//               </div>
//             ) : (
//               <div className="space-y-1">
//                 {output.map((line, index) => (
//                   <div key={index} className={`py-0.5 ${
//                     line.startsWith('[error]') || line.includes('❌') ? 'text-red-500' : 
//                     line.startsWith('[warn]') ? 'text-yellow-500' : 
//                     line.includes('✅') ? 'text-green-500' :
//                     line.includes('⏳') ? 'text-blue-500' :
//                     'text-gray-900 dark:text-gray-100'
//                   }`}>
//                     {line}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// } 

"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { Play, ChevronDown, Terminal, Loader2 } from "lucide-react";

// Dynamically import the Editor component with SSR disabled
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(mod => mod.default),
  { ssr: false, loading: () => (
    <div className="flex items-center justify-center h-[60vh] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading editor...
      </div>
    </div>
  )}
);

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
];

const themes = [
  { value: "vs-dark", label: "Dark" },
  { value: "light", label: "Light" },
];

// Define type for Pyodide
// interface Pyodide {
//   runPython: (code: string) => any;
//   runPythonAsync: (code: string) => Promise<any>;
// }

export function CodeEditor() {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(`// Start coding here\nconsole.log("Hello, world!");`);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [showOutput, setShowOutput] = useState(true);
  interface PyodideInstance {
    runPython: (code: string) => unknown;
    runPythonAsync: (code: string) => Promise<unknown>;
  }
  
  const [pyodide, setPyodide] = useState<PyodideInstance | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize Pyodide for Python execution
  useEffect(() => {
    if (language === "python" && !pyodide) {
      const loadPyodideScript = () => {
        setOutput(prev => [...prev, "⏳ Loading Python runtime..."]);
        
        // Create a script element for Pyodide
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.crossOrigin = 'anonymous';
        
        script.onload = async () => {
          try {
            // Initialize Pyodide
            // Define a type for the loadPyodide function
            interface WindowWithPyodide extends Window {
              loadPyodide: (config: { indexURL: string }) => Promise<{ runPython: (code: string) => unknown; runPythonAsync: (code: string) => Promise<unknown>; }>;
            }
            
            const loadPyodide = (window as unknown as WindowWithPyodide).loadPyodide;
            const pyodideInstance = await loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
            });
            
            // Test the Pyodide instance
            await pyodideInstance.runPythonAsync('print("Pyodide loaded successfully!")');
            
            setPyodide(pyodideInstance);
            setOutput(prev => [...prev, "✅ Python runtime is ready!"]);
          } catch (err) {
            console.error('Pyodide loading error:', err);
            setOutput(prev => [...prev, `❌ Error loading Python: ${err instanceof Error ? err.message : String(err)}`]);
          }
        };
        
        script.onerror = () => {
          setOutput(prev => [...prev, "❌ Failed to load Python runtime. Please check your internet connection and try again."]);
        };
        
        // Add the script to the document
        document.head.appendChild(script);
      };

      // Load Pyodide
      loadPyodideScript();
    }
  }, [language, pyodide]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clearOutput = () => {
    setOutput([]);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = "";
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(prev => [...prev, `$ Running ${language} code...`]);
    
    try {
      // Clear previous outputs
      console.clear();
      if (iframeRef.current && language === "html") {
        iframeRef.current.srcdoc = "";
      }

      // Capture console output
      const originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info,
      };

      const captureConsole = (type: 'log' | 'error' | 'warn' | 'info') => {
        return (...args: unknown[]) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          setOutput(prev => [...prev, `[${type}] ${message}`]);
          originalConsole[type](...args);
        };
      };

      console.log = captureConsole('log');
      console.error = captureConsole('error');
      console.warn = captureConsole('warn');
      console.info = captureConsole('info');

      try {
        switch(language) {
          case 'javascript':
          case 'typescript':
            new Function(code)();
            break;
            
          case 'python':
            if (!pyodide) {
              setOutput(prev => [...prev, "⚠️ Python runtime is not ready. Please wait for it to load..."]);
              return;
            }
            try {
              // Capture Python's stdout
              pyodide.runPython(`
                import sys
                from io import StringIO
                sys.stdout = StringIO()
              `);
              
              // Run the user's code
              const result = await pyodide.runPythonAsync(code);
              
              // Get captured output
              const stdout = pyodide.runPython("sys.stdout.getvalue()");
              if (stdout) {
                setOutput(prev => [...prev, String(stdout)]);
              }
              
              // If there's a return value, show it
              if (result !== undefined && result !== null) {
                setOutput(prev => [...prev, `=> ${result}`]);
              }
              
              // Reset stdout
              pyodide.runPython("sys.stdout = sys.__stdout__");
            } catch (error) {
              setOutput(prev => [...prev, `❌ Python Error: ${error instanceof Error ? error.message : String(error)}`]);
            }
            break;
            
          case 'html':
            if (iframeRef.current) {
              iframeRef.current.srcdoc = code;
              setOutput(prev => [...prev, "HTML rendered in preview area"]);
            }
            break;
            
          case 'css':
            setOutput(prev => [...prev, "CSS would need to be applied to a DOM element"]);
            break;
            
          case 'json':
            try {
              const parsed = JSON.parse(code);
              setOutput(prev => [...prev, "Valid JSON:", JSON.stringify(parsed, null, 2)]);
            } catch (e) {
              setOutput(prev => [...prev, `JSON Error: ${e instanceof Error ? e.message : 'Invalid JSON'}`]);
            }
            break;
            
          default:
            setOutput(prev => [...prev, `No execution handler for ${language}`]);
        }
      } catch (error) {
        setOutput(prev => [...prev, `Execution Error: ${error instanceof Error ? error.message : String(error)}`]);
      }

      // Restore original console
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;

    } finally {
      setIsRunning(false);
      setOutput(prev => [...prev, `$ Execution completed`]);
    }
  };

  if (!mounted) {
    return (
      <div className="w-full overflow-hidden border rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <div className="h-[60vh] flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading editor...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b bg-white dark:bg-gray-800 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full sm:w-[180px] px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full sm:w-[180px] px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {themes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={clearOutput}
            disabled={output.length === 0}
            className="flex-1 text-black sm:flex-none px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear Output
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning || (language === "python" && !pyodide)}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium bg-blue-600 text-black rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run
              </>
            )}
          </button>
        </div>
      </div>

      <div className="relative">
        <MonacoEditor
          height="60vh"
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            formatOnPaste: true,
            formatOnType: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorSmoothCaretAnimation: "on",
            padding: { top: 16, bottom: 16 },
            lineNumbers: "on",
            glyphMargin: false,
            folding: true,
            automaticLayout: true,
            bracketPairColorization: {
              enabled: true,
            },
            wordWrap: "on",
            wrappingStrategy: "advanced",
          }}
          beforeMount={(monaco) => {
            monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
            monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
          }}
        />
      </div>
      
      {/* HTML Preview (only shown for HTML) */}
      {language === "html" && (
        <div className="border-t">
          <div className="flex items-center justify-between p-2 text-sm font-medium bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center">
              <Terminal className="w-4 h-4 mr-2" />
              <span>HTML Preview</span>
            </div>
          </div>
          <iframe 
            ref={iframeRef}
            className="w-full h-64 border-0 bg-white dark:bg-gray-900"
            sandbox="allow-scripts allow-same-origin"
            title="HTML Preview"
          />
        </div>
      )}
      
      {/* Output Console */}
      <div className="border-t">
        <button 
          className="flex items-center justify-between w-full p-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setShowOutput(!showOutput)}
        >
          <div className="flex items-center">
            <Terminal className="w-4 h-4 mr-2" />
            <span>Console Output</span>
            {output.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
                {output.length}
              </span>
            )}
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showOutput ? 'rotate-180' : ''}`} />
        </button>
        {showOutput && (
          <div className="h-[120px] overflow-auto p-2 bg-white dark:bg-gray-900 font-mono text-sm whitespace-pre-wrap">
            {output.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                Output will appear here...
              </div>
            ) : (
              <div className="space-y-1">
                {output.map((line, index) => (
                  <div key={index} className={`py-0.5 ${
                    line.startsWith('[error]') || line.includes('❌') ? 'text-red-500' : 
                    line.startsWith('[warn]') ? 'text-yellow-500' : 
                    line.includes('✅') ? 'text-green-500' :
                    line.includes('⏳') ? 'text-blue-500' :
                    'text-gray-900 dark:text-gray-100'
                  }`}>
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 

