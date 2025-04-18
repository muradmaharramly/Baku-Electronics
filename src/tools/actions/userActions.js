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
export const logoutUser = () => ({
    type: "LOGOUT_USER"
});
export const setUsers = (user) => ({
    type: "SET_USERS",
    payload: user,
});
export const setUserCount = (count) => ({
  type: "SET_USER_COUNT",
  payload: count,
});
export const setLoading = (loading) => ({
    type: "SET_LOADING",
    payload: loading,
});
  
export const setError = (error) => ({
    type: "SET_ERROR",
    payload: error,
});

export const adduser = (singleuser) => ({
    type: "ADD_USER",
    payload: singleuser,
});

export const editUser = (updatedUser) => ({
    type: "EDIT_USER",
    payload: updatedUser,
});

