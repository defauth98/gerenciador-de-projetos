export function removeAuthInLocalStorage() {
  localStorage.removeItem("@RNauth:token");
  localStorage.removeItem("@RNauth:user");
}
