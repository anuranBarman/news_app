import createDataContext from "./createDataContext";
import newsApi from "../api/news";

const sourceReducer = (state, action) => {
  switch (action.type) {
    case "fetch_sources":
      return action.payload;
    default:
      return state;
  }
};

const fetchSources = (dispatch) => async () => {
  try {
    console.log("fetching sources");
    const response = await newsApi.get(
      "/top-headlines/sources?category=technology&language=en"
    );
    dispatch({ type: "fetch_sources", payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const { Context, Provider } = createDataContext(
  sourceReducer,
  { fetchSources },
  []
);
