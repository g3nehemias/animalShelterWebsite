import { useState } from 'react';
import './App.css';
import Register from './pages/Register';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegisting, setIsRegistering] = useState(false);

  function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) {
      setMessage('Please enter your email and password.');
      return;
    }
    setMessage ('Login form is ready! Backend authentication will be connected later.');
  }

  if (isRegisting) {
    return <Register onBackToLogin={() => setIsRegistering(false)}/>;
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <div className="brand-icon"></div>
          <h1>Animal Shelter</h1>
          <p>Every animal deserves a loving home.</p>
        </div>

        <div className="login-heading">
          <h2>Welcome Back!</h2>
          <p>Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="login-options">
            <label className="remember-option">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>

          <button
            type="button"
            className="show-password-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide password' : 'Show password'}
          </button>

          {message && <p className="login-message">{message}</p>}
        </form>

        <div className="signup-link">
          Don't have an account? {' '}
          <button type="button" className="text-button" onClick={() => setIsRegistering(true)}>
            Create One
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;