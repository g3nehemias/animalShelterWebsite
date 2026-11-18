import './AdminDashboard.css'

function AdminDashboard({ onNavigate, onLogout }) {
    return (
        <div className="admin-page">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>Shelter Admin</h2>
                    <p>Management System</p>
                </div>

                <nav className="admin-menu">
                    <button className="admin-menu-item active">
                        Dashboard
                    </button>

                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-animals')}
                    >
                        Animal Management
                    </button>

                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-applications')}
                    >
                        Applications
                    </button>

                    <button className="admin-menu-item" 
                        onClick={() => onNavigate('admin-medical-records')}
                    >
                        Medical Records
                    </button>

                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-appointments')}
                    >
                        Appointments
                    </button>
                    
                    <button className="admin-menu-item" 
                        onClick={() => onNavigate('admin-inventory')}
                    >
                        Inventory
                    </button>

                    <button className="admin-menu-item" disabled>
                        User Management
                    </button>
                </nav>

                <button className="admin-logout" onClick={onLogout}>
                    Log Out
                </button>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back, Administrator</p>
                    </div>
                    <span className="admin-role">Administrator</span>
                </header>

                <section className="admin-status">
                    <div className="admin-stat-card">
                        <h3>Total Animals</h3>
                        <p>48</p>
                        <span>Currently in the shelter</span>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Available Applications</h3>
                        <p>32</p>
                        <span>Ready for adoption</span>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Pending Applciations</h3>
                        <p>8</p>
                        <span>Awaiting reviews</span>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Adopted Animals</h3>
                        <p>16</p>
                        <span>Successfully adopted</span>
                    </div>
                </section>

                <section className="admin-overview">
                    <div className="admin-overview-card">
                        <h2>Quick Overview</h2>
                        <p>
                            Use the navigation menu to manage shelter
                            animals, adoption applications, medical
                            records, appointments, inventory, and users.
                        </p>

                        <ul>
                            <li>Review pending adoption applications</li>
                            <li>Keep animal profiles up to date</li>
                            <li>Monitor upcoming medical care</li>
                            <li>Manage adoption appointment</li>
                            <li>Check shelter supply levels</li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminDashboard;