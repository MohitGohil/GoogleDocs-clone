const { Schema, model } = require("mongoose");

const Document = new Schema({
  _id: String,
  data: Object,
});

module.export = model("Document", Document);
