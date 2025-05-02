const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  // Handle empty responses (like for DELETE requests)
  if (response.status === 204) {
    // No Content
    return null;
  }

  // Only try to parse JSON if there's content
  const text = await response.text();
  const json = text ? JSON.parse(text) : null;

  if (!response.ok) {
    if (json?.message) {
      throw new Error(json.message);
    }
    throw new Error(`Error ${response.status} occurred`);
  }
  return json;
};

export {fetchData};
