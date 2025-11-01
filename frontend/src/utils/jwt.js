// JWT token management using localStorage
export function setToken(token) {
  localStorage.setItem('jwtToken', token);
}

export function getToken() {
  return localStorage.getItem('jwtToken');
}

export function removeToken() {
  localStorage.removeItem('jwtToken');
}
