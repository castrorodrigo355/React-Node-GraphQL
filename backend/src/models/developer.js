import { Schema, model } from "mongoose";

const developerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  tech: {
    type: String,
    required: true
  }
});

export default model("Developer", developerSchema);
