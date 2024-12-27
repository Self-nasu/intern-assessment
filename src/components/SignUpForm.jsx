import React from 'react';

function SignUpForm({ signUpData, handleSignUpChange, handleSignUpSubmit }) {
    return (
        <div className="container-fluid w-50 ps-4">
            <h4 className="mb-4 text-center">Join Us! Create Your Account (Create)</h4>
            <form onSubmit={handleSignUpSubmit}>
                <div className="mb-3">
                    <label htmlFor="signup-email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="signup-email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={signUpData.email}
                        onChange={handleSignUpChange}
                    />
                </div>
                <div className="d-flex gap-3">
                    <div className="mb-3 w-50">
                        <label htmlFor="signup-name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="signup-name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={signUpData.name}
                            onChange={handleSignUpChange}
                        />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="signup-phone" className="form-label">Phone</label>
                        <input
                            type="tel"
                            id="signup-phone"
                            className="form-control"
                            placeholder="Enter your phone number"
                            value={signUpData.phone}
                            onChange={handleSignUpChange}
                        />
                    </div>
                </div>

                <div className="d-flex gap-3">
                    <div className="mb-3 w-50">
                        <label htmlFor="signup-profileImage" className="form-label">Profile Image URL</label>
                        <input
                            type="text"
                            id="signup-profileImage"
                            className="form-control"
                            placeholder="Enter the URL of your profile image"
                            value={signUpData.profileImage}
                            onChange={handleSignUpChange}
                        />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="signup-password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="signup-password"
                            className="form-control"
                            placeholder="Pick a password"
                            value={signUpData.password}
                            onChange={handleSignUpChange}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-success w-100">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
