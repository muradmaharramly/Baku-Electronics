export const registerSuccess = (user) => ({
    type: 'REGISTER_SUCCESS',
    payload: user
});

export const registerFail = (error) => ({
    type: 'REGISTER_FAIL',
    payload: error
});

export const confirmSuccess = () => ({
    type: 'CONFIRM_SUCCESS'
});

export const confirmFail = (error) => ({
    type: 'CONFIRM_FAIL',
    payload: error
});

export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user
});

export const loginFail = (error) => ({
    type: 'LOGIN_FAIL',
    payload: error
});

export const resetPasswordSuccess = (message) => ({
    type: 'RESET_PASSWORD_SUCCESS',
    payload: message
});

export const resetPasswordFail = (error) => ({
    type: 'RESET_PASSWORD_FAIL',
    payload: error
});

export const confirmResetSuccess = () => ({
    type: 'CONFIRM_RESET_SUCCESS'
});

export const confirmResetFail = (error) => ({
    type: 'CONFIRM_RESET_FAIL',
    payload: error
});

export const setPasswordSuccess = (message) => ({
    type: 'SET_PASSWORD_SUCCESS',
    payload: message
});

export const setPasswordFail = (error) => ({
    type: 'SET_PASSWORD_FAIL',
    payload: error
});

export const updateUserSuccess = (user) => ({
    type: 'UPDATE_USER_SUCCESS',
    payload: user
});

export const updateUserFail = (error) => ({
    type: 'UPDATE_USER_FAIL',
    payload: error
});

export const changePasswordSuccess = () => ({
    type: "CHANGE_PASSWORD_SUCCESS",
});

export const changePasswordFail = (error) => ({
    type: "CHANGE_PASSWORD_FAIL",
    payload: error,
});

