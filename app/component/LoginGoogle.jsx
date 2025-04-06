    import React, {useEffect, useState, useRef} from 'react';
    import {useGoogleLogin } from '@react-oauth/google';
    import GoogleLogo from '../assets/GoogleLogo.png'
    import {useNavigate} from 'react-router'

    export default function LoginGoogle ({handleClose}) {
    
        const [user, setUser] = useState()
        const [error, setError] = useState()
        const hasMounted = useRef(false);

        const navigate = useNavigate()
        useEffect(() => {
        
            const getData = async () => {
            if (user) {
                try {
                // Step 1: Get user info from Google
                const googleRes = await fetch(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`
                );
        
                if (!googleRes.ok) {
                    throw new Error("Failed to fetch user info from Google");
                }
        
                const data = await googleRes.json();
                const { name, email, picture } = data;
        
                // Step 2: Send user info to your backend
                const backendRes = await fetch("http://localhost:5000/users/google-login", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                    "Content-Type": "application/json",
                    
                    },
                    body: JSON.stringify({ name, email, picture })
                });
        
                if (!backendRes.ok) {
                    const errorData = await backendRes.json();
                    throw new Error(errorData.error || "Google login failed");
                }
        
                // Success: Redirect and close
                navigate('/dashboard');
        
                } catch (err) {
                console.error(err);
                setError(err.message || "An error occurred during Google login");
                }
            }
            };
        
            if (user && !hasMounted.current) {
            getData();
            hasMounted.current = true;
            }
        
        }, [user, navigate, handleClose]);


        const login = useGoogleLogin({
            onSuccess: (codeResponse) => setUser(codeResponse),
            onError: (error) => console.log('Login Failed: ', error)
        })

        return (
            <>
                <div className = "google-sign-in" >
                    <button type = "button" onClick = {() => login()}><img alt = "Google logo" src={GoogleLogo} /> Continue with Google</button>
                </div>
                {error && <span className='error'>{error}</span>}
            </>
        )
    }