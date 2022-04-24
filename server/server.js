// const mongoose = require("mongoose");
// const Document = require("./Document");

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

const defaultValue = "";

// mongoose connection
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect("mongodb://localhost:27017/google-docs-clone");
// }

// connection to the server is established and the socket is set up to listen for changes from the server
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("get-document", async (documentId) => {
    // const Document = await findOrCreateDocument(documentId);
    const data = "";
    socket.join(documentId);
    socket.emit("load-document", data /*document.data*/);

    socket.on("send-changes", (delta) => {
      // console.log(delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    // socket.on("save-document", async (data) => {
    //   await Document.findOrCreateDocument(documentId, { data });
    // });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// async function findOrCreateDocument(id) {
//   if (id == null) return;
//   const document = await Document.findById(id);
//   if (document) return document;
//   return await Document.create({ _id: id, data: defaultValue });
// }
