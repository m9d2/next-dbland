'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

interface MonacoEditorProps {
  value: string;
  language: string;
  onChange: (newValue: string) => void;
  className?: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ value, language, onChange, className }) => {
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const [editorInstance, setEditorInstance] = useState<any>(null);

  useEffect(() => {
    console.log('MonacoEditor useEffect', editorContainer.current, !editorInstance);
    if (editorContainer.current && !editorInstance) {
      const editor = monaco.editor.create(editorContainer.current, {
        value,
        language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
      });

      editor.onDidChangeModelContent(() => {
        const newValue = editor.getValue();
        onChange(newValue);
      });

      setEditorInstance(editor);

      return () => {
        editor.dispose();
      };
    }
  }, [editorInstance, value, language, onChange]);

  useEffect(() => {
    if (editorInstance) {
      editorInstance.setValue(value);
    }
  }, [value, editorInstance]);

  return <div className={className} ref={editorContainer} style={{ height: '300px' }} />;
};

export default MonacoEditor;