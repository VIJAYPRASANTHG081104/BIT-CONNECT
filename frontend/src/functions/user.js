import axios from "axios";

export const updateprofilePicture = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BACKEND_URL}/updateProfilePicture`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // dispatch({ type: "UPDATEPICTURE", payload: data });
    // let cookie = Cookies.get("user");

    // if (cookie) {
    //   try {
    //     cookie = JSON.parse(cookie);
    //     cookie.picture = data;
    //     Cookies.set("user", JSON.stringify(cookie));
    //     console.log(cookie);
    //   } catch (error) {
    //     console.error("Failed to parse the cookie:", error);
    //   }
    // } else {
    //   console.log("No cookie found with the name 'user'.");
    // }
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateCover = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BACKEND_URL}/updateCover`,
      {
        url,
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