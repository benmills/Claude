import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

const MarkdownEditor = () => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-focus on load
    textareaRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-paper flex">
      {/* Editor Pane */}
      <div className="w-full lg:w-1/2 min-h-screen border-r border-gray-200">
        <div className="max-w-reading mx-auto px-10 py-20">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            placeholder="Start writing..."
            className="w-full min-h-[calc(100vh-160px)] bg-transparent border-none outline-none resize-none font-serif text-[19px] leading-[1.7] text-gray-800 placeholder:text-gray-400"
            style={{ caretColor: '#374151' }}
          />
        </div>
      </div>

      {/* Preview Pane */}
      <div className="hidden lg:block w-1/2 min-h-screen overflow-y-auto">
        <div className="max-w-reading mx-auto px-10 py-20">
          {content === '' ? (
            <p className="text-gray-400 font-serif text-[19px] leading-[1.7]">
              Preview will appear here...
            </p>
          ) : (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-serif font-semibold text-4xl mt-8 mb-4 text-gray-900 leading-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-serif font-semibold text-3xl mt-7 mb-3 text-gray-900 leading-tight">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-serif font-semibold text-2xl mt-6 mb-2 text-gray-900 leading-snug">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="font-serif font-medium text-xl mt-5 mb-2 text-gray-900 leading-snug">
                      {children}
                    </h4>
                  ),
                  h5: ({ children }) => (
                    <h5 className="font-serif font-medium text-lg mt-4 mb-2 text-gray-900 leading-snug">
                      {children}
                    </h5>
                  ),
                  h6: ({ children }) => (
                    <h6 className="font-serif font-medium text-base mt-4 mb-2 text-gray-900 leading-snug">
                      {children}
                    </h6>
                  ),
                  p: ({ children }) => (
                    <p className="font-serif text-[19px] leading-[1.7] mb-4 text-gray-800">
                      {children}
                    </p>
                  ),
                  code: ({ className, children }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="font-mono text-[0.9em] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={`font-mono text-[15px] ${className || ''}`}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="font-mono text-[15px] bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc ml-6 mb-4 space-y-1 text-gray-800">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-6 mb-4 space-y-1 text-gray-800">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="font-serif text-[19px] leading-[1.7]">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-blue-700 hover:text-blue-800 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  hr: () => (
                    <hr className="border-0 border-t border-gray-300 my-8" />
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border-collapse border border-gray-300">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-gray-300 px-4 py-2 bg-gray-50 font-serif font-semibold text-left">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-gray-300 px-4 py-2 font-serif">
                      {children}
                    </td>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
