import axios from "axios";

export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BACKEND_URL}/createpost`,
      {
        type,
        background,
        text,
        images,
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const reactPost = async (postId, react, token) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BACKEND_URL}/reactPost`,
      {
        postId,
        react,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BACKEND_URL}/getReacts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const comment = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BACKEND_URL}/comment`,
      { postId, comment, image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const deleteComment = async (postId, commentId, token) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BACKEND_URL}/deleteComment`,
      { postId, commentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const savePost = async (postId, token) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BACKEND_URL}/savePost/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deletePost = async (postId, token) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_BACKEND_URL}/deletePost/${postId}`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
