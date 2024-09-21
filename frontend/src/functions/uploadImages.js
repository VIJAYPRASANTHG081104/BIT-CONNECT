import axios from "axios";

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BACKEND_URL}/uploadimages`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    return error.response.data.message
  }
};
