import { useState } from 'react';
import './AdminApplications.css';

function AdminApplications ({
    applications,
    onNavigate,
    onUpdateStatus,
    onLogout
}) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredApplications = applications.filter((application) => {
        const matchesSearch =
            application.animalName.toLowerCase().includes(search.toLowerCase()) ||
            String(application.id).includes(search);

        const matchesStatus =
            statusFilter === 'All' || application.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="admin-page">
             <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>Animal Shelter</h2>
                    <p>Administration</p>
                </div>

                <nav className="admin-menu">
                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-dashboard')}>
                        Dashboard
                    </button>

                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-animals')}>
                        Animal Management
                    </button>

                    <button className="admin-menu-item active">
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

                    <button className="admin-menu-item" disabled>
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
                        <h1>Application Management</h1>
                        <p>Review and manage adoption applications</p>
                    </div>
                </header>

                <section className="admin-application-content">
                    <div className="application-tools">
                        <input 
                            type="text"
                            placeholder="Search by animal or application ID..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                        >
                            <option value="All">All Applications</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="admin-applications-list">
                        {filteredApplications.length === 0 ? (
                            <p>No Applications found</p>
                        ) : (
                            filteredApplications.map((application) => (
                                <div className="admin-application-card" key={application.id}>
                                    <div>
                                        <h3>{application.animalName}</h3>
                                        <p>Application ID: {application.id}</p>
                                        <p>Submitted: {application.date}</p>
                                        <span className={'application-status ${application.status.toLowerCase()}'}>
                                            {application.status}
                                        </span>
                                    </div>

                                    <div className="application-actions">
                                        <button
                                            onClick={() => onUpdateStatus(application.id, 'Acceptable')}
                                            disabled={application.status === 'Accepted'}
                                        >
                                            Approve
                                        </button>

                                        <button 
                                            onClick={() => onUpdateStatus(application.id, 'Rejected')}
                                            disabled={application.status === 'Rejected'}
                                        >
                                            Reject
                                        </button>

                                        <button
                                            onClick={() => onUpdateStatus(application.id, 'Pending')}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminApplications;