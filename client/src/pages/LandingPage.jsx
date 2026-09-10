import { useEffect, useState } from "react";
import { getContent } from "../services/api";

import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Showcase from "../components/Showcase";
import Gallery from "../components/Gallery";
import ShortMessage from "../components/ShortMessage";

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
      <Hero name={content?.name} />

      <Intro
        aboutCompany={content?.aboutCompany}
        whyChoose={content?.whyChoose}
      />

      <Showcase />

      <Gallery />

      <ShortMessage />
    </main>
  );
}

export default LandingPage;