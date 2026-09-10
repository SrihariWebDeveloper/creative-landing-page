import { useState } from "react";

function ContentForm({ content, onSubmit }) {
  const [formData, setFormData] = useState(() => ({
    name: content?.name || "",
    aboutCompany: content?.aboutCompany || "",
    whyChoose: content?.whyChoose || ""
  }));

  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await onSubmit(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="content-editor">
      <div className="editor-header">
        <span>ADMIN PANEL</span>

        <h1>
          Landing Page
          <br />
          Content Editor
        </h1>

        <p>
          Update the content displayed on your landing page.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="aboutCompany">
            About Company
          </label>

          <textarea
            id="aboutCompany"
            name="aboutCompany"
            value={formData.aboutCompany}
            onChange={handleChange}
            placeholder="Enter about company"
            rows="6"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="whyChoose">
            Why Choose
          </label>

          <textarea
            id="whyChoose"
            name="whyChoose"
            value={formData.whyChoose}
            onChange={handleChange}
            placeholder="Why should customers choose you?"
            rows="6"
            required
          />
        </div>

        <button
          type="submit"
          className="save-button"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <a
        href="/"
        className="back-link"
      >
        ← View Landing Page
      </a>
    </div>
  );
}

export default ContentForm;