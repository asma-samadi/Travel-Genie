export function getUsers() {
  const users = localStorage.getItem("users");

  return users ? JSON.parse(users) : [];
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}