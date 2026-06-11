/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Eraser } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Provide description details...', id }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastInsertedValueRef = useRef('');

  // Dual-sync for external program resets or edit sets
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      if (value !== lastInsertedValueRef.current) {
        editorRef.current.innerHTML = value || '';
        lastInsertedValueRef.current = value || '';
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      // If the content is just a break tag or empty space, treat as empty
      const sanitized = html === '<br>' || html === '' ? '' : html;
      lastInsertedValueRef.current = sanitized;
      onChange(sanitized);
    }
  };

  const executeCommand = (command: string, val: string = '') => {
    document.execCommand(command, false, val);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div id={id} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-2 border-b border-slate-200 dark:border-slate-800 select-none">
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          className="p-1 px-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300 font-bold hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          className="p-1 px-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300 italic hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-slate-350 dark:bg-slate-700 mx-1" />
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-1 px-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          className="p-1 px-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-slate-350 dark:bg-slate-700 mx-1" />
        <button
          type="button"
          onClick={() => executeCommand('removeFormat')}
          className="p-1 px-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          title="Clear Format"
        >
          <Eraser className="w-4 h-4" />
        </button>
      </div>
      
      {/* Editable Container */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[140px] max-h-[300px] overflow-y-auto focus:outline-none text-xs leading-relaxed rich-text-content"
        placeholder={placeholder}
        style={{ outline: 'none' }}
      />
    </div>
  );
}
