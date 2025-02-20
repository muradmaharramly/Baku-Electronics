import { createStore, combineReducers } from "redux";
import productReducer from "../reducers/productReducer"; 
import newsReducer from "../reducers/newsReducer";
import campaignReducer from "../reducers/campaignReducer";

const rootReducer = combineReducers({
    products: productReducer, 
    news: newsReducer,
    campaigns: campaignReducer,
});

const store = createStore(rootReducer);

export default store;
