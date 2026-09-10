import { useEffect, useState } from "react";
import { getContent, updateContent } from "../services/api";

import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Showcase from "../components/Showcase";
import Gallery from "../components/Gallery";
import ShortMessage from "../components/ShortMessage";

import galleryAsset2 from "../assets/images/2.jpg";
import galleryAsset3 from "../assets/images/3.jpg";
import galleryAsset4 from "../assets/images/4.jpg";
import galleryAsset5 from "../assets/images/5.jpg";
import galleryAsset6 from "../assets/images/6.jpg";

const defaultGalleryImages = [
  galleryAsset2,
  galleryAsset3,
  galleryAsset4,
  galleryAsset5,
  galleryAsset6
];

const normalizeGalleryImages = (images) => {
  if (!Array.isArray(images) || images.length === 0) {
    return defaultGalleryImages;
  }

  return images.map((image, index) => {
    if (typeof image === "string" && image.startsWith("/images/")) {
      return defaultGalleryImages[index % defaultGalleryImages.length];
    }

    return image;
  });
};

function LandingPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getContent()
      .then((response) => {
        if (isMounted && response?.data) {
          setContent(response.data);
        }
      })
      .catch(() => {
        console.log("Using fallback landing content");
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleHeroImageChange = async (url) => {
    if (!content?._id) return;

    const nextContent = {
      ...content,
      heroImage: url
    };

    try {
      const response = await updateContent(content._id, nextContent);
      setContent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGalleryImagesChange = async (images) => {
    if (!content?._id) return;

    const nextContent = {
      ...content,
      galleryImages: images
    };

    try {
      const response = await updateContent(content._id, nextContent);
      setContent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <main className="landing-page-main">
      <Hero
        name={content?.name}
        heroImage={content?.heroImage || "/images/hero.png"}
        onHeroImageChange={handleHeroImageChange}
      />

      <Intro
        aboutCompany={content?.aboutCompany}
        whyChoose={content?.whyChoose}
      />

      <Showcase />

      <Gallery
        galleryImages={normalizeGalleryImages(content?.galleryImages)}
        onGalleryImagesChange={handleGalleryImagesChange}
      />

      <ShortMessage />
    </main>
  );
}

export default LandingPage;