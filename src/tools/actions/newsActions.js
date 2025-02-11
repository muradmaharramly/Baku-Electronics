export const SET_NEWS = "SET_NEWS";
export const SET_NEWS_COUNT = "SET_NEWS_COUNT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export const setNews = (news) => ({
  type: SET_NEWS,
  payload: news,
});
export const setNewsCount = (count) => ({
  type: SET_NEWS_COUNT,
  payload: count,
});
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
