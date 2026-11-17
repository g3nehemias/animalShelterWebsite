import { useState } from 'react';
import './App.css';
import Register from './pages/Register';
import Home from './pages/Home';
import Animals from './pages/Animals';
import AnimalDetails from './pages/AnimalDetails';
import AdoptionApplication from './pages/AdoptionApplication';
import MyApplications from './pages/MyApplications';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [applications, setApplications] = useState([
    {
        id: 101,
        animalName: 'Buddy',
        animalId: 1,
        date: '11/02/2026',
        status: 'Accepted'
    },
    {
        id: 102,
        animalName: 'Luna',
        animalId: 2,
        date: '11/08/2026',
        status: 'Pending'
    },
    {
        id: 103,
        animalName: 'Max',
        animalId: 3,
        date: '10/25/2026',
        status: 'Rejected'
    }
]);

  if (currentPage === 'home') {
    return (
        <Home
            onNavigate={(page, data) => {
                if (page === 'animal-details') {
                    setSelectedAnimal(data);
                    setCurrentPage('animal-details');
                } else {
                    setCurrentPage(page);
                }
            }}
            onBrowseAnimals={() => setCurrentPage('animals')}
        />
    );
}

if (currentPage === 'animals') {
    return (
        <Animals
            onNavigate={(page, data) => {
                if (page === 'animal-details') {
                    setSelectedAnimal(data);
                    setCurrentPage('animal-details');
                } else {
                    setCurrentPage(page);
                }
            }}
        />
    );
}

if (currentPage === 'animal-details') {
    return (
        <AnimalDetails
            animal={selectedAnimal}
            onNavigate={(page) => setCurrentPage(page)}
        />
    );
}

if (currentPage === 'application') {
    return (
        <AdoptionApplication
            animal={selectedAnimal}
            onNavigate={(page) => setCurrentPage(page)}
            onSubmitApplication={(application) => {
                setApplications((previousApplications) => [
                    application,
                    ...previousApplications
                ]);
                setCurrentPage('applications');
            }}
        />
    );
}

if (currentPage === 'applications') {
    return (
        <MyApplications
            applications={applications}
            onNavigate={(page) => setCurrentPage(page)}
        />
    );
}

if (currentPage === 'account') {
    return (
        <Account
            onNavigate={(page) => setCurrentPage(page)}
        />
    );
}

if (currentPage === 'admin-dashboard') {
  return (
    <AdminDashboard
      onNaviagte={(page) => setCurrentPage(page)}
      onLogout={() => {
        setIsAdmin(false);
        setEmail('');
        setPassword('');
        setMessage('');
        setCurrentPage('login');
      }}
    />
  );
}

  function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) {
      setMessage('Please enter your email and password.');
      return;
    }

    if (email === 'admin@gmail.com' && password === 'admin1') {
      setIsAdmin(true);
      setCurrentPage('admin-dashboard');
      return;
    }
    /* setMessage ('Login form is ready! Backend authentication will be connected later.'); <- This will be used later */
    setIsAdmin(false);
    setCurrentPage('home');
  }

  if (isRegistering) {
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