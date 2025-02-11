import store from "../store/store";
import { supabase } from "../../services/supabaseClient";

export const fetchProducts = async () => {
    store.dispatch({ type: "SET_LOADING", payload: true });

    try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) throw error;

        store.dispatch({ type: "SET_PRODUCTS", payload: data });
        console.log("Fetched products from Supabase:", data);
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", payload: error.message });
        console.error("Error fetching products:", error.message);
    }
};
