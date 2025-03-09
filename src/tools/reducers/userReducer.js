const initialState = {
    user: [],
    userCount: 0,
    error: null,
    message: null,
    resetCodeConfirmed: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_USERS":
            return { ...state, loading: false, user: action.payload };
        case 'REGISTER_SUCCESS':
            return { ...state, user: action.payload, error: null, message: "Qeydiyyat uğurla tamamlandı!" };
        case 'REGISTER_FAIL':
            return { ...state, error: action.payload, message: null };

        case 'CONFIRM_SUCCESS':
            return { ...state, error: null, message: "Email təsdiqləndi!" };
        case 'CONFIRM_FAIL':
            return { ...state, error: action.payload, message: null };

        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload, error: null, message: "Giriş uğurla tamamlandı!" };
        case 'LOGIN_FAIL':
            return { ...state, error: action.payload, message: null };

        case 'RESET_PASSWORD_SUCCESS':
            return { ...state, error: null, message: action.payload, resetCodeConfirmed: false };
        case 'RESET_PASSWORD_FAIL':
            return { ...state, error: action.payload, message: null };

        case 'CONFIRM_RESET_SUCCESS':
            return { ...state, error: null, message: "Kod doğrulandı!", resetCodeConfirmed: true };
        case 'CONFIRM_RESET_FAIL':
            return { ...state, error: action.payload, message: null, resetCodeConfirmed: false };

        case 'SET_PASSWORD_SUCCESS':
            return { ...state, error: null, message: action.payload, resetCodeConfirmed: false };
        case 'SET_PASSWORD_FAIL':
            return { ...state, error: action.payload, message: null };

        case 'UPDATE_USER_SUCCESS':
            return { ...state, user: { ...state.user, ...action.payload }, error: null, message: "Məlumatlar uğurla yeniləndi!" };
        case 'UPDATE_USER_FAIL':
            return { ...state, error: action.payload, message: null };

        case 'CHANGE_PASSWORD_SUCCESS':
            return { ...state, error: null, message: "Şifrə uğurla dəyişdirildi!" };
        case 'CHANGE_PASSWORD_FAIL':
            return { ...state, error: action.payload, message: null };
        case "LOGOUT_USER":
            return { ...state, user: null, error: null, message: null };
        case "SET_USER_COUNT":
            return { ...state, loading: false, userCount: action.payload, };
        case "SET_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "ADD_USER":
            return { ...state, user: [...state.user, action.payload] };
        case "EDIT_USER":
            return {
                ...state,
                user: state.user.map((singleuser) =>
                    singleuser.id === action.payload.id ? action.payload : singleuser
                ),
            };

        default:
            return state;
    }
};

export default userReducer;