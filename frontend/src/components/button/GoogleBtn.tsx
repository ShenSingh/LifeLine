import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {setToken} from "../../service/AuthService.tsx";

export function GoogleBtn() {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Get user info from Google using the access token
                const userInfoResponse = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`
                        }
                    }
                );

                // Send the user data to your backend
                const res = await axios.post("http://localhost:8181/api/v1/auth/google", {
                    token: tokenResponse.access_token,
                    email: userInfoResponse.data.email,
                    name: userInfoResponse.data.name
                });

                // Store the JWT token returned from your backend
                if (res.data && res.data.data) {
                    // Make sure the backend includes the token in the response
                    console.log("Logged in successfully!");

                    if (res.data.data.token) {
                        setToken(res.data.data.token);
                    }

                    // Redirect to another page after successful login
                    if(res.data.data.role === "admin") {
                        window.location.href = "/admin";
                    }else {
                        window.location.href = "/";
                    }
                }
            } catch (error) {
                console.error("Google login failed:", error);
            }
        },
        onError: (error) => {
            console.log("Google login error:", error);
        },
        // Use auth code flow to get both access and ID tokens
        flow: "implicit",
        scope: "email profile openid",
    });

    return (
        <button
            onClick={() => login()}
            className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* SVG path data unchanged */}
            </svg>
            Sign up with Google
        </button>
    );
}
