import { useRef, useState } from "react";

import showcaseAsset7 from "../assets/images/7.jpg";
import showcaseAsset8 from "../assets/images/8.jpg";
import showcaseAsset9 from "../assets/images/9.jpg";

function Showcase() {
  const [cardsImages, setCardsImages] = useState([
    showcaseAsset7,
    showcaseAsset8,
    showcaseAsset9
  ]);

  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadClick = (idx) => {
    setActiveCardIndex(idx);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && activeCardIndex !== null) {
      const newUrl = URL.createObjectURL(file);
      setCardsImages((prev) => {
        const updated = [...prev];
        updated[activeCardIndex] = newUrl;
        return updated;
      });
    }
  };

  return (
    <section className="showcase-section">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Background diagonal copper banner */}
      <div className="showcase-copper-bg" />

      <div className="showcase-wrapper">
        <div className="showcase-cards-container">
          {/* Left Card */}
          <div className="showcase-card card-left">
            <div className="card-img-box">
              <img src={cardsImages[0]} alt="Showcase 1" />
            </div>
            <button
              className="card-upload-btn"
              onClick={() => handleUploadClick(0)}
              aria-label="upload image"
              title="Click to upload new image"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </button>
          </div>

          {/* Center Main Taller Card */}
          <div className="showcase-card card-center">
            <div className="card-tag">EXIT</div>
            <div className="card-img-box">
              <img src={cardsImages[1]} alt="Showcase 2" />
            </div>
            <button
              className="card-upload-btn center-upload-btn"
              onClick={() => handleUploadClick(1)}
              aria-label="upload image"
              title="Click to upload new image"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </button>
          </div>

          {/* Right Card */}
          <div className="showcase-card card-right">
            <div className="card-img-box">
              <img src={cardsImages[2]} alt="Showcase 3" />
            </div>
            <button
              className="card-upload-btn"
              onClick={() => handleUploadClick(2)}
              aria-label="upload image"
              title="Click to upload new image"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3 Pagination Indicator Dots */}
        <div className="showcase-pagination-dots">
          <span className="dot" />
          <span className="dot active" />
          <span className="dot" />
        </div>
      </div>
    </section>
  );
}

export default Showcase;
