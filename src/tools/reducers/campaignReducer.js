import { SET_CAMPAIGNS, SET_CAMPAIGN_COUNT, SET_LOADING, SET_ERROR } from "../actions/campaignActions";

const initialState = {
  campaigns: [],
  campaignCount: 0,
  loading: false,
  error: null,
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_CAMPAIGNS:
      return { ...state, loading: false, campaigns: action.payload, error: null };
    case SET_CAMPAIGN_COUNT:  
      return {...state,loading: false, campaignCount: action.payload,};  
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default campaignReducer;
