const { Schema, model } = require("mongoose");

const Document = new Schema({
  _id: String,
  data: {
    type: Object,
    default: "",
  },
});

module.export = model("Document", Document);
