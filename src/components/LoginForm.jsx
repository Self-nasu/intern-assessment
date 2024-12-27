import React from 'react';

function LoginForm({ loginData, handleLoginChange, handleLoginSubmit }) {
    return (
        <div className="container-fluid w-50 border-end pe-4">
            <h4 className="mb-4 text-center">Welcome Back! Please Login (Read)</h4>
            <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                    <label htmlFor="login-email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="login-email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="login-password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
