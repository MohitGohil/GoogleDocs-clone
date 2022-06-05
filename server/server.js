const mongoose = require("mongoose");
const Document = require("./Document");

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
    // const document = await findOrCreateDocument(documentId); //when mangoose is connected, this will be executed
    const data = ""; // without mongoose
    socket.join(documentId);
    socket.emit("load-document" /*, document.data*/);

    socket.on("send-changes", (delta) => {
      // console.log(delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    // socket.on("save-document", async (data) => {
    //   await Document.findByIdAndUpdate(documentId, { data });
    // });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// async function findOrCreateDocument(id) {
//   console.log(id);
//   if (id == null) return;
//   // const document = await Document.find({ _id: mongoose.ObjectId(id) });
//   if (document) return document;
//   return await Document.create({ _id: id, data: defaultValue });
// }
