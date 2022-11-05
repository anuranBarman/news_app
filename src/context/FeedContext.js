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
    case "set_query":
      return {
        articles: [],
        totalResults: 0,
        q: action.payload,
        page: 1,
      };
    default:
      return state;
  }
};

const fetchFeed = (dispatch) => async (query) => {
  try {
    console.log("fetching feed with query " + query);
    const response = await newsApi.get(
      query == ""
        ? "/top-headlines" + "?language=en&category=technology&pageSize=20"
        : "/everything" +
            "?language=en&pageSize=20&q=" +
            query +
            "&searchIn=title"
    );
    //console.log(response.data);
    dispatch({ type: "fetch_feed", payload: response.data });
  } catch (e) {
    console.log(e.response);
  }
};

const loadMoreFeed = (dispatch) => async (query, page) => {
  console.log("loadMoreFeed called");
  try {
    console.log("fetching feed more");
    const response = await newsApi.get(
      query == ""
        ? "/top-headlines" +
            "?language=en&category=technology&pageSize=20&page=" +
            page
        : "/everything" +
            "?language=en&pageSize=20&q=" +
            query +
            "&page=" +
            page +
            "&searchIn=title"
    );
    //console.log(response.data);
    dispatch({ type: "load_more_feed", payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

const setQuery = (dispatch) => (query) => {
  console.log("setting query ", query);
  dispatch({ type: "set_query", payload: query });
};

export const { Context, Provider } = createDataContext(
  feedReducer,
  { fetchFeed, setQuery, loadMoreFeed },
  { articles: [], totalResults: 0, page: 1, q: "" }
);
