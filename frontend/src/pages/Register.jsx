import { useState } from 'react';

function Register({ onBackToLogin }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    function handleRegister(event) {
        event.preventDefault();

        if (
            !firstName || !lastName || !email || !password || !confirmPassword
        ) {
            setMessage('Please fill in all fields');
            return;
        } 

        if (password.length < 8) {
            setMessage('Password must be at least 8 character');
            return;
        }

        if (password !== confirmPassword) {
            setMessage ('Passwords do not match');
            return;
        }

        setMessage ('Registration form is ready! Backend registration will be connected later');
    }

    return (
        <main className="login-page">
            <section className="login-card">
                <div className="brand">
                    <div className="brand-icon"></div>
                    <h1>Animal Shelter</h1>
                    <p>Every animal deserves a loving home</p>
                </div>

                <div className="login-heading">
                    <h2>Create an Account</h2>
                    <p>Join us and find your new best friend</p>
                </div>

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="registerEmail">Email Address</label>
                        <input
                            id="registerEmail"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="registerPassword">Password</label>
                        <input
                            id="registerPassword"
                            type="password"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Create Account
                    </button>

                    {message && <p className="login-message">{message}</p>}
                </form>

                <div className="signup-link">
                    Already have an account?{' '}
                    <button type="button" className="text-button" onClick={onBackToLogin}>
                        Sign In
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Register;