import Content from "../models/Content.js";

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
          "We focus on quality, creativity and meaningful experiences that make every project stand out."
      });
    }

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
    const { name, aboutCompany, whyChoose } = req.body;

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
      whyChoose
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
    const { id } = req.params;
    const { name, aboutCompany, whyChoose } = req.body;

    const content = await Content.findByIdAndUpdate(
      id,
      {
        name,
        aboutCompany,
        whyChoose
      },
      {
        new: true,
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