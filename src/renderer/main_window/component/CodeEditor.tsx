import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

interface CodeEditorProps {
  value: string;
  onChange: (newValue: string) => void;
}
export default function CodeEditor(props: CodeEditorProps) {
  return (
    <AceEditor
      mode="java"
      theme="github"
      height="100%"
      width="100%"
      style={{ flex: "1" }}
      value={props.value}
      onChange={props.onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
}
