export function registerUser({ username, password, role }) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.username === username)) {
    return { success: false, message: 'Username already exists' };
  }
  users.push({ username, password, role });
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true };
}

export function loginUser({ username, password }) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username && u.password === password);
  return user ? { success: true, role: user.role } : { success: false };
}

export function submitForm(formData) {
  const forms = JSON.parse(localStorage.getItem('forms') || '[]');
  forms.push(formData);
  localStorage.setItem('forms', JSON.stringify(forms));
}
