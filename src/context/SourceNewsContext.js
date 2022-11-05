import createDataContext from "./createDataContext";
import newsApi from "../api/news";

const feedReducer = (state, action) => {
  //console.log(action.payload);
  switch (action.type) {
    case "fetch_feed":
      return {
        ...state,
        articles: [...action.payload.articles],
        totalResults: action.payload.totalResults,
        page: state.page + 1,
      };
    case "load_more_feed":
      return {
        ...state,
        articles: [...state.articles, ...action.payload.articles],
        page: state.page + 1,
      };
    default:
      return state;
  }
};

const fetchFeed = (dispatch) => async (sourceName) => {
  try {
    //console.log("fetching feed");
    const response = await newsApi.get(
      "/top-headlines?language=en&pageSize=20" + "&sources=" + sourceName
    );
    //console.log(response.data);
    dispatch({ type: "fetch_feed", payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

const loadMoreFeed = (dispatch) => async (page, sourceName) => {
  try {
    console.log("fetching feed more");
    const response = await newsApi.get(
      "/top-headlines?language=en&pageSize=20&page=" +
        page +
        "&sources=" +
        sourceName
    );
    //console.log(response.data);
    dispatch({ type: "load_more_feed", payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const { Context, Provider } = createDataContext(
  feedReducer,
  { fetchFeed, loadMoreFeed },
  { articles: [], totalResults: 0, page: 1 }
);
