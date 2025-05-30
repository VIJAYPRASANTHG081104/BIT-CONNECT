export function postsReducer(state, action) {
  switch (action.type) {
    case "POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "POST_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        post: action.payload,
      };
    case "POST_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function profileReducer(state, action) {
  switch (action.type) {
    case "PROFILE_REQUEST":
      return { ...state, loading: true, error: "" };
    case "PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: "",
      };
    case "PROFILE_POST":
      return {
        ...state, 
        loading: false,
        error: "",
        profile: {
          ...state.profile,
          post: action.payload, 
        },
      };
    case "PROFILE_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export function photosReducer(state, action) {
  switch (action.type) {
    case "PHOTO_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "PHOTO_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        photos: action.payload,
      };
    case "PHOTO_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
