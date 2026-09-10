const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const getContent = async () => {
  const response = await fetch(`${API_BASE_URL}/content`);

  if (!response.ok) {
    throw new Error("Failed to fetch content");
  }

  return response.json();
};

export const updateContent = async (id, content) => {
  const response = await fetch(`${API_BASE_URL}/content/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(content)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update content");
  }

  return response.json();
};

export const createContent = async (content) => {
  const response = await fetch(`${API_BASE_URL}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(content)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create content");
  }

  return response.json();
};