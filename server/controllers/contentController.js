import Content from "../models/Content.js";

const defaultGalleryImages = [
  "/images/hero_portrait.jpg",
  "/images/hero.png",
  "/images/hero_portrait.jpg",
  "/images/hero.png",
  "/images/hero_portrait.jpg"
];

const defaultIntroImages = [
  "/images/intro-1.jpg",
  "/images/intro-2.jpg",
  "/images/hero.png",
  "/images/intro-1.jpg"
];

const defaultShowcaseImages = [
  "/images/intro-1.jpg",
  "/images/hero.png",
  "/images/intro-2.jpg"
];

// GET CONTENT
export const getContent = async (req, res) => {
  try {
    let content = await Content.findOne();

    // Create default content if database is empty
    if (!content) {
      content = await Content.create({
        name: "JENNY",
        aboutCompany:
          "We create modern digital experiences through creativity, technology and thoughtful design.",
        whyChoose:
          "We focus on quality, creativity and meaningful experiences that make every project stand out.",
        heroImage: "/images/hero.png",
        galleryImages: defaultGalleryImages,
        introImages: defaultIntroImages,
        showcaseImages: defaultShowcaseImages
      });
    }

    if (!content.heroImage) {
      content.heroImage = "/images/hero.png";
    }

    if (!Array.isArray(content.galleryImages) || content.galleryImages.length === 0) {
      content.galleryImages = defaultGalleryImages;
    }

    if (!Array.isArray(content.introImages) || content.introImages.length === 0) {
      content.introImages = defaultIntroImages;
    }

    if (!Array.isArray(content.showcaseImages) || content.showcaseImages.length === 0) {
      content.showcaseImages = defaultShowcaseImages;
    }

    await content.save();

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch content",
      error: error.message
    });
  }
};

// CREATE CONTENT
export const createContent = async (req, res) => {
  try {
    const {
      name,
      aboutCompany,
      whyChoose,
      heroImage,
      galleryImages,
      introImages,
      showcaseImages
    } = req.body;

    if (!name || !aboutCompany || !whyChoose) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingContent = await Content.findOne();

    if (existingContent) {
      return res.status(409).json({
        success: false,
        message: "Content already exists. Use PUT to update it."
      });
    }

    const content = await Content.create({
      name,
      aboutCompany,
      whyChoose,
      heroImage: heroImage || "/images/hero.png",
      galleryImages: galleryImages || defaultGalleryImages,
      introImages: introImages || defaultIntroImages,
      showcaseImages: showcaseImages || defaultShowcaseImages
    });

    res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create content",
      error: error.message
    });
  }
};

// UPDATE CONTENT
export const updateContent = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const {
      name,
      aboutCompany,
      whyChoose,
      heroImage,
      galleryImages,
      introImages,
      showcaseImages
    } = req.body;

    const content = await Content.findByIdAndUpdate(
      id,
      {
        name,
        aboutCompany,
        whyChoose,
        heroImage,
        galleryImages,
        introImages,
        showcaseImages
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update content",
      error: error.message
    });
  }
};