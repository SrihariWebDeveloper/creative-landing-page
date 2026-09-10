import { useRef } from "react";

import { uploadImage } from "../services/api";
import heroAsset from "../assets/images/hero.png";

function Hero({ name, heroImage, onHeroImageChange }) {
  const safeName = name || "Jenny";
  const username = "jameswill";

  const fileInputRef = useRef(null);

  const titleLetters = String(safeName)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .split("");

  const titleRows = [];

  for (let i = 0; i < titleLetters.length; i += 3) {
    titleRows.push(titleLetters.slice(i, i + 3).join(" . "));
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const response = await uploadImage(file);
      if (onHeroImageChange) {
        onHeroImageChange(response.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="hero-section">
      {/* Hidden file input for uploading hero image */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Background diagonal copper overlays */}
      <div className="hero-copper-band-left" />
      <div className="hero-copper-band-right" />

      <div className="hero-layout-wrapper">
        {/* Top-Right Dot Matrix Grid (6x4) */}
        <div className="hero-top-right-dots">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="dot-item" />
          ))}
        </div>

        {/* Top-Left Title: dynamic name rendered using the same title-row style */}
        <div className="hero-title-overlay">
          {titleRows.map((row, index) => (
            <div key={`${row}-${index}`} className="title-row">
              {row}
            </div>
          ))}
        </div>

        {/* Center Main Portrait Card */}
        <div className="hero-portrait-card">
          <img
            src={heroAsset}
            alt={safeName}
            className="hero-portrait-img"
          />

          {/* Teal Upload Button (inside portrait top-right) */}
          <button
            className="portrait-upload-btn"
            onClick={handleUploadClick}
            aria-label="upload image"
            title="Click to upload new image"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </button>

          {/* Glass Profile Card (Overlapping Bottom Right) */}
          <div className="hero-glass-card">
            <h3 className="card-name">I’m {safeName}</h3>
            <p className="card-username">@{username}</p>
            <div className="card-actions">
              <button className="btn-text">Message</button>
              <button className="btn-text">Follow</button>
            </div>
          </div>
        </div>

        {/* Bottom-Left Overlay: Dot Grid + Followers Badge */}
        <div className="hero-bottom-left-overlay">
          {/* Dot Matrix (4x3) */}
          <div className="hero-left-dots">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="dot-item" />
            ))}
          </div>

          {/* Followers Badge */}
          <div className="followers-badge">
            <div className="badge-shield">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="#f59e0b">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>4.5</span>
            </div>
            <div className="followers-content">
              <span className="followers-count">15K</span>
              <span className="followers-label">F a l l o w e r s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;