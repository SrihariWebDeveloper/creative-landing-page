import { useEffect, useState } from "react";
import { getContent, updateContent } from "../services/api";
import ContentForm from "../components/ContentForm";

function AdminPage() {
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
      .catch((error) => {
        console.error(error);
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

  const handleUpdate = async (formData) => {
    try {
      const response = await updateContent(content._id, formData);
      setContent(response.data);
      alert("Content updated successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <main className="admin-page">
      <ContentForm content={content} onSubmit={handleUpdate} />
    </main>
  );
}

export default AdminPage;