import store from "../store/store";
import { supabase } from "../../services/supabaseClient"; 

export const fetchProducts = async () => {
    try {
        const { data, error } = await supabase.from("products").select("*"); 

        if (error) {
            throw error; 
        }

        store.dispatch({
            type: "SET_PRODUCTS",
            payload: data, 
        });

        console.log("Fetched products from Supabase:", data); 
    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
};
