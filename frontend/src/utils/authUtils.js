// Save the authentication token to localStorage
export const saveAuthToken = (token) => {
    localStorage.setItem("authToken", token);
};

// Get the stored authentication token
export const getAuthToken = () => {
    return localStorage.getItem("authToken");
};

// Remove token on logout
export const removeAuthToken = () => {
    localStorage.removeItem("authToken");
};
