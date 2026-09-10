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
    },

    heroImage: {
      type: String,
      default: "/images/hero.png"
    },

    galleryImages: {
      type: [String],
      default: [
        "/images/hero_portrait.jpg",
        "/images/hero.png",
        "/images/hero_portrait.jpg",
        "/images/hero.png",
        "/images/hero_portrait.jpg"
      ]
    },

    introImages: {
      type: [String],
      default: [
        "/images/intro-1.jpg",
        "/images/intro-2.jpg",
        "/images/hero.png",
        "/images/intro-1.jpg"
      ]
    },

    showcaseImages: {
      type: [String],
      default: [
        "/images/intro-1.jpg",
        "/images/hero.png",
        "/images/intro-2.jpg"
      ]
    }
  },
  {
    timestamps: true
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;