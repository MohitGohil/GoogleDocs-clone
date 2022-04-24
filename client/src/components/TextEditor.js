import { React, useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";

function TextEditor() {
  const { quill, quillRef } = useQuill();
  const [socket, setSocket] = useState();
  const { id: documentId } = useParams();

  // this use effect is to connect to the server and listen for changes.
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to server");
    });
    s.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    return () => {
      s.disconnect();
    };
  }, []);

  // this use effect is to listen for changes from the server and apply them to the editor with document id
  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  // useeffect for saving the document to the database
  // useEffect(() => {
  //   if (socket == null || quill == null) return;

  //   const interval = setInterval(() => {
  //     socket.emit("save-document", quill.getContents());
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [socket, quill]);

  // this use effect is to receive the changes from the server and update the quill
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  // this use effect if from sending doc changes to server whenever quill changes
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    quill.disable();
    quill.setText("Loading...");

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  return (
    <div id="container" className="container">
      <div ref={quillRef}></div>
    </div>
  );
}

export default TextEditor;
