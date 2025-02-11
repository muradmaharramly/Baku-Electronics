import { createStore, combineReducers } from "redux";
import productReducer from "../reducers/productReducer"; 
import newsReducer from "../reducers/newsReducer";

const rootReducer = combineReducers({
    products: productReducer, 
    news: newsReducer,
});

const store = createStore(rootReducer);

export default store;
