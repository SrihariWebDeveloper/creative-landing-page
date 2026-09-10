function ShortMessage() {
  return (
    <footer className="short-message-section">
      {/* Background diagonal dark-copper banner */}
      <div className="footer-bg-banner" />

      <div className="footer-container">
        <div className="short-message-header">
          <button className="upload-btn footer-upload-btn" aria-label="icon">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>
          <h3 className="short-message-title">SHORT MESSAGE</h3>
        </div>

        <p className="short-message-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis
        </p>

        <div className="footer-subtext">
          Thank you ! Visit Again
        </div>
      </div>
    </footer>
  );
}

export default ShortMessage;