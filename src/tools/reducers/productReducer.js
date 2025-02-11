import { SET_PRODUCTS, SET_LOADING, SET_ERROR } from "../actions/productActions";
const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_PRODUCTS:
            return { ...state, loading: false, products: action.payload }; 
        case SET_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default productReducer;
