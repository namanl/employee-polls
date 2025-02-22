export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function logoutAuthedUser() {
  return {
    type: LOGOUT_AUTHED_USER,
  };
}

// export function handleLogin(username, password) {
//   return (dispatch, getState) => {
//     const { users } = getState();

//     const user = Object.values(users).find(
//       (user) => user.id === username && user.password === password
//     );

//     if (!!user) {
//       return dispatch(setAuthedUser(user));
//     } else {
//       throw new Error('Invalid username or password');
//     }
//   };
// }

// export function handleLogout() {
//   return (dispatch) => {
//     return dispatch(logoutAuthedUser());
//   };
// }
