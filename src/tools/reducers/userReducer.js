const initialState = {
    user: null,
    error: null,
    message: null,
    resetCodeConfirmed: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
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

        default:
            return state;
    }
};

export default userReducer;