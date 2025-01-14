// auth.js
export function isAuthenticated() {
    const token = localStorage.getItem('token'); // Replace 'token' with your key
    return token !== null; // Optionally, validate the token's expiry
}
