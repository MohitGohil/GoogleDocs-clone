import { React, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function TextEditor() {
  const { quill, quillRef } = useQuill();
  console.log(quill);
  return (
    <div id="container">
      <div ref={quillRef} />
    </div>
  );
}

export default TextEditor;
