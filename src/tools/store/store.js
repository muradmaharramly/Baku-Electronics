import { createStore, combineReducers } from "redux";
import productReducer from "../reducers/productReducer"; 
import newsReducer from "../reducers/newsReducer";
import campaignReducer from "../reducers/campaignReducer";
import userReducer from "../reducers/userReducer";
import adminReducer from "../reducers/administratorReducer";

const rootReducer = combineReducers({
    products: productReducer, 
    news: newsReducer,
    campaigns: campaignReducer,
    user: userReducer,
    administrators: adminReducer
});

const store = createStore(rootReducer);

export default store;
