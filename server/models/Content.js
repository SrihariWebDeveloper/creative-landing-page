import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    aboutCompany: {
      type: String,
      required: true,
      trim: true
    },

    whyChoose: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;