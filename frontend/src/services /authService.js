const API_BASE_URL = "http://localhost:8080/api/user"; // Replace with your backend URL

export const signup = async (userData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_BASE_URL}/register`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText)); // Successful response
            } else {
                reject(new Error("Signup failed"));
            }
        };

        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(JSON.stringify(userData));
    });
};
