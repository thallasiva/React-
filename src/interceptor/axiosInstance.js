import axios from 'axios';

const apiInstace = axios.create({
    baseURL: 'https://hcp-api.hcpasia.com.au',
    headers: {
        'content-type': 'application/json'
    }
});

// Request Interceptor to add Authorization token before each request
apiInstace.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('loginResponse'));
        console.log("User's login token:", token);

        if (token) {
            // If a token exists, add it to Authorization header
            config.headers['authorization'] = `${token.responseData.authToken}`;
        }

        return config;
    },
    (error) => {
        // Handle any request errors here
        return Promise.reject(error);
    }
);

// Response Interceptor to handle response errors globally
apiInstace.interceptors.response.use(
    (response) => {
        return response; // Simply return the response data as is
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or unauthorized
            alert('Token expired or unauthorized');
            localStorage.removeItem('loginResponse');
            window.location.href = '/';  // Or use React Router to navigate
        }
        return Promise.reject(error); // Reject the promise if there's an error
    }
);

export default apiInstace; // Export the Axios instance
