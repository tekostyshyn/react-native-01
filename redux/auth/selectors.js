export const selectUserId = (state) => state.auth.user.userId;

export const selectUserLogin = (state) => state.auth.user.login;

export const selectUserEmail = (state) => state.auth.user.email;

export const selectLoginState = (state) => state.auth.isLoggedIn;
