import { SET_PRODUCTS, SET_PRODUCT_COUNT, SET_LOADING, SET_ERROR } from "../actions/productActions";
const initialState = {
    products: [],
    productCount:0,
    loading: false,
    error: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_PRODUCTS:
            return { ...state, loading: false, products: action.payload }; 
        case SET_PRODUCT_COUNT:  
              return {...state,loading: false, productCount: action.payload,};  
        case SET_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default productReducer;
