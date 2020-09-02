
export const LOGIN = "LOGIN_USER";
export function login_user(payload) {
  return (
    {
      type: 'LOGIN_USER',
      payload,
    }
  );
}

export const LOGOUT = "LOGOUT_USER";
export function logout_user() {
  return (
    {
      type: 'LOGOUT_USER',
    }
  );
}
