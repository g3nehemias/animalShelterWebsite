
import './MyApplications.css';

function MyApplications({ applications, onNavigate }) {
    return (
        <div className="my-applications-page">

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

            <main className="my-applications-content">
                <header className="my-applications-header">
                    <h1>My Adoption Applications</h1>
                    <p>Track the status of your adoption applications.</p>
                </header>

                <section className="applications-list">
                    {applications.length > 0 ? (
                        applications.map((application) => (
                            <article
                                className="application-card"
                                key={application.id}
                            >
                                <div className="application-card-info">
                                    <h2>{application.animalName}</h2>
                                    <p>
                                        Application ID: {application.id}
                                    </p>
                                    <p>
                                        Submitted: {application.date}
                                    </p>
                                </div>

                                <div className="application-card-status">
                                    <span className={`status ${application.status.toLowerCase()}`}>
                                        {application.status}
                                    </span>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="no-applications">
                            <h2>No Applications Yet</h2>
                            <p>You haven't submitted any adoption applications.</p>
                            <button onClick={() => onNavigate('animals')}>
                                Browse Animals
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default MyApplications;
