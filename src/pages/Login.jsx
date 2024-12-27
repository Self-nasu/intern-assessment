import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

function Login() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signUpData, setSignUpData] = useState({ email: '', name: '', phone: '', password: '', profileImage: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home'); // send to home if already logged in
        }
    }, [navigate]);

    const handleLoginChange = (e) => {
        const field = e.target.id.replace('login-', '');
        setLoginData({ ...loginData, [field]: e.target.value });
    };

    const handleSignUpChange = (e) => {
        const { id, value } = e.target;
        const field = id.replace('signup-', '');
        setSignUpData({ ...signUpData, [field]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', loginData);
            alert('Login successful');
            localStorage.setItem('token', response.data.token);
            navigate('/home'); // send to home page
        } catch (err) {
            alert('Login failed: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = { ...signUpData };

        try {
            await axios.post('http://localhost:5000/api/signup', dataToSend, {
                headers: { 'Content-Type': 'application/json' },
            });
            alert('Signup successful Now Login!');
        } catch (err) {
            alert('Signup failed: ' + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div id="Main" className="d-flex justify-content-center align-items-center vh-100">
            <div className="container-sm shadow-lg d-flex cust-border flex-column bg-light p-4 py-5 cust-rounded">
                <div className="d-flex container-fluid justify-content-center align-items-center mb-5">
                    <img src="./Logo.svg" style={{ height: '50px' }} alt="Logo" />
                    <p className="h1 px-2">Users (CRUD) WebApp</p>
                </div>

                <div className="container-fluid d-flex">
                    <LoginForm loginData={loginData} handleLoginChange={handleLoginChange} handleLoginSubmit={handleLoginSubmit} />
                    <SignUpForm signUpData={signUpData} handleSignUpChange={handleSignUpChange} handleSignUpSubmit={handleSignUpSubmit} />
                </div>
            </div>
        </div>
    );
}

export default Login;
