import { useState } from 'react';
import './AdoptionApplication.css';

function AdoptionApplication({ animal, onNavigate, onSubmitApplication }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        housingType: '',
        ownOrRent: '',
        hasPets: '',
        petExperience: '',
        reason: '',
        agreement: false
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
            [name]: type === 'checksum' ? checked : value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const application = {
            ...formData,
            id: Date.now(),
            animalName: animal.name,
            animalId: animal.id,
            date: new Date().toLocaleDateString(),
            status: 'Pending' 
        };

        onSubmitApplication(application);
    }

    return (
        <div className="application-page">
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

            <main className="application-content">
                <button
                    className="back-button"
                    onClick={() => onNavigate('animal-details')}
                >
                    Back to Animal Details
                </button>

                <header className="application-header">
                    <h1>Adoption Application</h1>
                    <p>Please complete the form below to apply for adoption</p>
                </header>

                <section className="applying-for">
                    <h2>Applying to Adopt</h2>
                    <p><strong>Animal:</strong> {animal.name}</p>
                    <p><strong>Breed:</strong> {animal.breed}</p>
                    <p><strong>Species:</strong> {animal.species}</p>
                </section>

                <form className="application-form" onSubmit={handleSubmit}>
                    <section className="form-section">
                        <h2>Personal Information</h2>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>First Name</label>
                                <input name="firstName" value={formData.firstName}
                                    onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input name="lastName" value={formData.lastName}
                                    onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" value={formData.email}
                                    onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" name="phone" value={formData.phone}
                                    onChange={handleChange} required />
                            </div>

                            <div className="form-group full-width">
                                <label>Street Address</label>
                                <input name="address" value={formData.address}
                                    onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>City</label>
                                <input name="city" value={formData.city}
                                    onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>State</label>
                                <input name="state" value={formData.state}
                                    onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>ZIP Code</label>
                                <input name="zipCode" value={formData.zipCode}
                                    onChange={handleChange} required />
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h2>Living Situation</h2>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Type of Housing</label>
                                <select name="housingType" value={formData.housingType}
                                    onChange={handleChange} required>
                                    <option value="">Select housing type</option>
                                    <option value="House">House</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Townhouse">Townhouse</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Do you own or rent?</label>
                                <select name="ownOrRent" value={formData.ownOrRent}
                                    onChange={handleChange} required>
                                    <option value="">Select an option</option>
                                    <option value="Own">Own</option>
                                    <option value="Rent">Rent</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Do you currently have pets?</label>
                                <select name="hasPets" value={formData.hasPets}
                                    onChange={handleChange} required>
                                    <option value="">Select an option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h2>Pet Experience</h2>

                        <div className="form-group">
                            <label>Tell us about your previous experience with pets.</label>
                            <textarea
                                name="petExperience"
                                value={formData.petExperience}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Why would you like to adopt this animal?</label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>
                    </section>

                    <section className="form-section">
                        <h2>Agreement</h2>

                        <label className="agreement-option">
                            <input
                                type="checkbox"
                                name="agreement"
                                checked={formData.agreement}
                                onChange={handleChange}
                                required
                            />
                            I confirm that the information provided is accurate
                            and agree to the shelter's adoption review process.
                        </label>
                    </section>

                    <div className="application-actions">
                        <button type="button" className="cancel-button"
                            onClick={() => onNavigate('animal-details')}>
                            Cancel
                        </button>

                        <button type="submit" className="submit-button">
                            Submit Application
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AdoptionApplication;