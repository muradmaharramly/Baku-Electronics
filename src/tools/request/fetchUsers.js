import store from "../store/store";
import { supabase } from "../../services/supabaseClient";
import { setUserCount } from "../actions/userActions";

export const fetchUsers = async () => {
    store.dispatch({ type: "SET_LOADING", payload: true });

    try {
        const { data, error } = await supabase.from("users").select("*", { count: "exact" });
        if (error) throw error;
        
        const userCount = data.length;

        store.dispatch({ type: "SET_USERS", payload: data });
        store.dispatch(setUserCount(userCount));
        console.log("Fetched users from Supabase:", data);
        console.log("Total user count:", userCount);
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", payload: error.message });
        console.error("Error fetching users:", error.message);
    }
};