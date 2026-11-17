
import { useState } from 'react';
import './Account.css';

function Account({ onNavigate }) {
    const [account, setAccount] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;

        setAccount({
            ...account,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsEditing(false);
        setMessage('Account information saved successfully.');
    }

    return (
        <div className="account-page">

            <nav className="navbar">
                <div className="navbar-brand">
                    Animal Shelter Management System
                </div>

                <div className="navbar-links">
                    <button onClick={() => onNavigate('home')}>Home</button>
                    <button onClick={() => onNavigate('animals')}>Browse Animals</button>
                    <button onClick={() => onNavigate('applications')}>My Applications</button>
                    <button onClick={() => onNavigate('account')}>Account</button>
                </div>
            </nav>

            <main className="account-content">

                <header className="account-header">
                    <h1>My Account</h1>
                    <p>Manage your personal information and account details.</p>
                </header>

                <form className="account-form" onSubmit={handleSubmit}>

                    <section className="account-section">
                        <h2>Personal Information</h2>

                        <div className="account-grid">
                            <div className="account-field">
                                <label>First Name</label>
                                <input
                                    name="firstName"
                                    value={account.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            <div className="account-field">
                                <label>Last Name</label>
                                <input
                                    name="lastName"
                                    value={account.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            <div className="account-field">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={account.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            <div className="account-field">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={account.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="account-section">
                        <h2>Address Information</h2>

                        <div className="account-grid">
                            <div className="account-field full-width">
                                <label>Street Address</label>
                                <input
                                    name="address"
                                    value={account.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="account-field">
                                <label>City</label>
                                <input
                                    name="city"
                                    value={account.city}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="account-field">
                                <label>State</label>
                                <input
                                    name="state"
                                    value={account.state}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="account-field">
                                <label>ZIP Code</label>
                                <input
                                    name="zipCode"
                                    value={account.zipCode}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </section>

                    {message && (
                        <p className="account-message">{message}</p>
                    )}

                    <div className="account-actions">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    className="cancel-edit-button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setMessage('');
                                    }}
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="save-account-button">
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="edit-account-button"
                                onClick={() => {
                                    setIsEditing(true);
                                    setMessage('');
                                }}
                            >
                                Edit Information
                            </button>
                        )}
                    </div>

                </form>

                <section className="account-logout">
                    <h2>Account Actions</h2>
                    <p>Want to leave your account?</p>

                    <button
                        className="logout-button"
                        onClick={() => onNavigate('login')}
                    >
                        Log Out
                    </button>
                </section>

            </main>
        </div>
    );
}

export default Account;
