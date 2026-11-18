
import { useState } from 'react';
import './AdminAppointments.css';

function AdminAppointments({
    animals,
    appointments,
    onNavigate,
    onAddAppointment,
    onUpdateAppointment,
    onDeleteAppointment,
    onLogout
}) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        animalId: '',
        applicantName: '',
        date: '',
        time: '',
        type: 'Meet and Greet',
        notes: '',
        status: 'Scheduled'
    });

    const activeAnimals = animals.filter((animal) => !animal.archived);

    const filteredAppointments = appointments.filter((appointment) => {
        const animal = animals.find(
            (item) => item.id === Number(appointment.animalId)
        );

        const animalName = animal ? animal.name : '';

        const matchesSearch =
            animalName.toLowerCase().includes(search.toLowerCase()) ||
            appointment.applicantName.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === 'All' || appointment.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            !formData.animalId ||
            !formData.applicantName.trim() ||
            !formData.date ||
            !formData.time
        ) {
            return;
        }

        onAddAppointment({
            ...formData,
            id: Date.now(),
            animalId: Number(formData.animalId)
        });

        setFormData({
            animalId: '',
            applicantName: '',
            date: '',
            time: '',
            type: 'Meet and Greet',
            notes: '',
            status: 'Scheduled'
        });

        setShowForm(false);
    }

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

                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-applications')}>
                        Applications
                    </button>

                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-medical-records')}>
                        Medical Records
                    </button>

                    <button className="admin-menu-item active">
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
                        <h1>Appointment Management</h1>
                        <p>Schedule and manage shelter appointments.</p>
                    </div>

                    <button
                        className="appointment-add-button"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : '+ Schedule Appointment'}
                    </button>
                </header>

                {showForm && (
                    <form className="appointment-form" onSubmit={handleSubmit}>
                        <h2>Schedule New Appointment</h2>

                        <label>Animal</label>
                        <select
                            name="animalId"
                            value={formData.animalId}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select an animal</option>
                            {activeAnimals.map((animal) => (
                                <option key={animal.id} value={animal.id}>
                                    {animal.name} - {animal.species}
                                </option>
                            ))}
                        </select>

                        <label>Applicant Name</label>
                        <input
                            type="text"
                            name="applicantName"
                            value={formData.applicantName}
                            onChange={handleInputChange}
                            placeholder="Enter applicant name"
                            required
                        />

                        <label>Appointment Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            <option value="Meet and Greet">Meet and Greet</option>
                            <option value="Adoption Interview">Adoption Interview</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Veterinary Visit">Veterinary Visit</option>
                            <option value="Other">Other</option>
                        </select>

                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Time</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Additional Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Enter appointment notes..."
                        />

                        <button type="submit">Save Appointment</button>
                    </form>
                )}

                <section className="appointment-content">
                    <div className="appointment-tools">
                        <input
                            type="text"
                            placeholder="Search by animal or applicant..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                        >
                            <option value="All">All Appointments</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="appointment-list">
                        {filteredAppointments.length === 0 ? (
                            <p className="appointment-empty">
                                No appointments found.
                            </p>
                        ) : (
                            filteredAppointments.map((appointment) => {
                                const animal = animals.find(
                                    (item) => item.id === Number(appointment.animalId)
                                );

                                return (
                                    <div className="appointment-card" key={appointment.id}>
                                        <div className="appointment-info">
                                            <h3>{animal ? animal.name : 'Unknown Animal'}</h3>
                                            <p><strong>Applicant:</strong> {appointment.applicantName}</p>
                                            <p><strong>Type:</strong> {appointment.type}</p>
                                            <p><strong>Date:</strong> {appointment.date}</p>
                                            <p><strong>Time:</strong> {appointment.time}</p>
                                            <p><strong>Notes:</strong> {appointment.notes || 'None'}</p>

                                            <span className={`appointment-status ${appointment.status.toLowerCase()}`}>
                                                {appointment.status}
                                            </span>
                                        </div>

                                        <div className="appointment-actions">
                                            <select
                                                value={appointment.status}
                                                onChange={(event) =>
                                                    onUpdateAppointment(
                                                        appointment.id,
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option value="Scheduled">Scheduled</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>

                                            <button
                                                onClick={() => onDeleteAppointment(appointment.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminAppointments;
