import './AnimalDetails.css';

function AnimalDetails({ animal, onNavigate }) {
    if (!animal) {
        return (
            <div className="animal-details-page">
                <h1>Animal not found</h1>
                <button onClick={() => onNavigate('animals')}>
                    Back to Browse Animals
                </button>
            </div>
        );
    }

    return (
        <div className="animal-details-page">

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

            <main className="animal-details-content">

                <section className="animal-profile">

                    <div className="animal-profile-image">
                        <img src={animal.image} alt={animal.name} />
                    </div>

                    <div className="animal-profile-info">
                        <h1>{animal.name}</h1>
                        <h3>{animal.breed}</h3>

                        <div className="animal-basic-info">
                            <p><strong>Species:</strong> {animal.species}</p>
                            <p><strong>Age:</strong> {animal.age}</p>
                            <p><strong>Gender:</strong> {animal.gender}</p>
                            <p><strong>Size:</strong> {animal.size}</p>
                        </div>

                        <div className="adoption-status">
                            Available for Adoption
                        </div>

                        <button
                            className="adopt-button"
                            onClick={() => onNavigate('application')}
                        >
                            Apply to Adopt
                        </button>
                    </div>
                </section>

                <section className="animal-description">
                    <h2> About {animal.name}</h2>
                    <p>
                        Meet {animal.name}! {animal.name} is looking for
                        a loving forever home. Contact our shelter to learn
                        more about this animal and arrange a visit.
                    </p>
                </section>

                <section className="animal-care">
                    <h2>Medical & Care Information</h2>
                    <p><strong>Vaccinations:</strong> Information available from shelter staff.</p>
                    <p><strong>Spay / Neuter:</strong> Information available from shelter staff.</p>
                    <p><strong>Special Care:</strong> Contact the shelter for more information.</p>
                </section>
            </main>
        </div>
    );
}

export default AnimalDetails;