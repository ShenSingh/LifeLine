// frontend/src/services/hospitalService.js

const API_URL = 'http://localhost:8181/api/v1/hospital';

export const getAllHospitals = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', API_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject('Error fetching hospitals: ' + xhr.statusText);
                }
            }
        };

        xhr.send();
    });
};