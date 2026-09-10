import { useRef, useState } from "react";

const initialGalleryImages = [
  "/images/hero_portrait.jpg",
  "/images/hero.png",
  "/images/hero_portrait.jpg",
  "/images/hero.png",
  "/images/hero_portrait.jpg",
];

function Gallery() {
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetUploadIndex, setTargetUploadIndex] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadClick = (e, idx) => {
    e.stopPropagation();
    setTargetUploadIndex(idx);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && targetUploadIndex !== null) {
      const newUrl = URL.createObjectURL(file);
      setGalleryImages((prev) => {
        const updated = [...prev];
        updated[targetUploadIndex] = newUrl;
        return updated;
      });
      setActiveIndex(targetUploadIndex);
    }
  };

  return (
    <section className="gallery-section">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Background diagonal dark-copper banner */}
      <div className="gallery-bg-banner" />

      <div className="gallery-container">
        {/* Title */}
        <h2 className="gallery-title">MYGALLERY</h2>

        {/* Main Preview Card */}
        <div className="gallery-main-card">
          <div className="gallery-img-wrapper" style={{ position: "relative" }}>
            <img
              src={galleryImages[activeIndex]}
              alt="Main Gallery Preview"
              className="gallery-main-img"
            />
            {/* Upload Button on Main Card */}
            <button
              className="upload-btn main-gallery-upload-btn"
              onClick={(e) => handleUploadClick(e, activeIndex)}
              aria-label="upload image"
              title="Click to upload new image for active item"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 10
              }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </button>
          </div>

          {/* Footer Bar inside main card */}
          <div className="gallery-card-footer">
            <div className="author-info">
              <div className="author-avatar">
                <img src="/images/hero.png" alt="Avatar" />
              </div>
              <div className="author-meta">
                <span className="author-name">Cameron Williamson</span>
                <span className="author-handle">@cameron_w</span>
              </div>
            </div>

            <div className="card-stats">
              <span className="stat-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#EF4444">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                26
              </span>
              <span className="stat-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#3B82F6">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
                23
              </span>
              <span className="stat-item share-icon">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#A855F7">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Full-width Thumbnails Row */}
        <div className="gallery-thumbnails-row">
          <div className="thumbnails-grid">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`thumb-card ${activeIndex === idx ? "active" : ""}`}
              >
                <img src={img} alt={`Gallery ${idx + 1}`} />
              </button>
            ))}
          </div>

          <button className="view-all-link">
            View all <span>&rsaquo;</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Gallery;