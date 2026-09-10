import { useRef, useState } from "react";

function Intro({ aboutCompany, whyChoose }) {
  const introText =
    aboutCompany ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, tincidunt sed purus a faucibus condimentum sed diam." +
    " Sed ac tellus fermentum, a aliquet felis. Duis id sagittis, purus auctor convallis. Pellentesque in quis rhoncus nisl sed metus gravida. Consectetur au miu/tur eros.";

  const [mosaicImages, setMosaicImages] = useState([
    "/images/intro-1.jpg",
    "/images/intro-2.jpg",
    "/images/hero.png",
    "/images/intro-1.jpg"
  ]);

  const [activeIndex, setActiveIndex] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadClick = (idx) => {
    setActiveIndex(idx);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && activeIndex !== null) {
      const newUrl = URL.createObjectURL(file);
      setMosaicImages((prev) => {
        const updated = [...prev];
        updated[activeIndex] = newUrl;
        return updated;
      });
    }
  };

  return (
    <section className="intro-section">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Background diagonal copper shape */}
      <div className="intro-bg-banner" />

      <div className="intro-container">
        {/* Left Column: 4 Mosaic Cards Grid */}
        <div className="intro-mosaic">
          {mosaicImages.map((img, idx) => (
            <div key={idx} className={`mosaic-card mosaic-card-${idx + 1}`}>
              <div className={`mosaic-img-box ${idx === 0 ? "gold-pattern-bg" : ""}`}>
                <img src={img} alt={`Intro mosaic ${idx + 1}`} />
              </div>
              <button
                className="upload-btn mosaic-upload-btn"
                onClick={() => handleUploadClick(idx)}
                aria-label="upload image"
                title="Click to upload new image"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: Title, Paragraph, and CTA Buttons */}
        <div className="intro-content">
          <div className="intro-heading-wrap">
            <h2 className="intro-title">
              MY<br />INTRO
            </h2>
            <button className="upload-btn intro-section-btn" aria-label="share">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          </div>

          <p className="intro-text">{introText}</p>

          {whyChoose && (
            <div className="why-choose-block">
              <h4>WHY CHOOSE</h4>
              <p>{whyChoose}</p>
            </div>
          )}

          {/* CTA Buttons inside copper banner */}
          <div className="intro-cta-banner">
            <button className="btn-cta">About Me</button>
            <button className="btn-cta">Hire Me</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;