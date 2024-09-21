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
      },{
        headers:{
            Authorization:`Bearer ${token}`
        }
      }
    );
    return "ok";

  } catch (error) {

    return error.response.data.message;
  }
};
