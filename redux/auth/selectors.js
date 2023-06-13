export const selectUserId = (state) => state.auth.user.userId;

export const selectUserLogin = (state) => state.auth.user.login;

export const selectUserEmail = (state) => state.auth.user.email;

export const selectUserPhoto = (state) => state.auth.user.photo;

export const selectLoginState = (state) => state.auth.isLoggedIn;

export const selectAuthError = (state) => state.auth.error;
