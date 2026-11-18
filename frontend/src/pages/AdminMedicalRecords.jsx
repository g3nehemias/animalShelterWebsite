import { useState } from 'react';
import './AdminMedicalRecords.css';
function AdminMedicalRecords({
    animals,
    medicalRecords,
    onNavigate,
    onAddRecord,
    onLogout
}) {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        animalId: '',
        date: '',
        type: 'Vaccination',
        veterinarian: '',
        treatment: '',
        notes: ''
    });

    const activeAnimals = animals.filter((animal) => !animal.archived);

    const filteredRecords = medicalRecords.filter((record) => {
        const animal = animals.find(
            (item) => item.id === Number(record.animalId)
        );

        const animalName = animal ? animal.name : '';

        const matchesSearch =
            animalName.toLowerCase().includes(search.toLowerCase()) ||
            record.treatment.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            typeFilter === 'All' || record.type === typeFilter;

        return matchesSearch && matchesType;
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

        if (!formData.animalId || !formData.date || !formData.treatment) {
            return;
        }

        onAddRecord({
            ...formData,
            id: Date.now(),
            animalId: Number(formData.animalId)
        });

        setFormData({
            animalId: '',
            date: '',
            type: 'Vaccination',
            veterinarian: '',
            treatment: '',
            notes: ''
        });

        setShowForm(false);
    }

    return (
        <div className="admin-page">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>Shelter Admin</h2>
                    <p>Management System</p>
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

                    <button className="admin-menu-item active">
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

                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-users')}
                    >
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
                        <h1>Medical Records</h1>
                        <p>Track animal health, treatments, and vaccinations</p>
                    </div>

                    <button
                        className="medical-add-button"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : 'Add Medical Record'}
                    </button>
                </header>

                {showForm && (
                    <form className="medical-form" onSubmit={handleSubmit}>
                        <h2>Add Medical Record</h2>

                        <label>Animal</label>
                        <select
                            name="animalId"
                            value={formData.animalId}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select an animals</option>
                            {activeAnimals.map((animal) => (
                                <option key={animal.id} value={animal.id}>
                                    {animal.name} - {animal.species}
                                </option>
                            ))}
                        </select>

                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={FormData.date}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Record Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            <option value="Vaccination">Vaccination</option>
                            <option value="Checkup">Checkup</option>
                            <option value="Treatment">Treatment</option>
                            <option value="Surgery">Surgery</option>
                            <option value="Medication">Medication</option>
                            <option value="Other">Other</option>
                        </select>

                        <label>Veterinarian</label>
                        <input
                            type="text"
                            name="veterinarian"
                            value={formData.veterinarian}
                            onChange={handleInputChange}
                            placeholder="Veterinarian name"
                        />

                        <label>Treatment</label>
                        <input
                            type="text"
                            name="treatment"
                            value={formData.treatment}
                            onChange={handleInputChange}
                            placeholder="Treatment or procedure"
                            required
                        />

                        <label>Additional Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Enter additional medical details..."
                        />

                        <button type="submit">Save Medical Record</button>
                    </form>
                )}

                <section className="medical-content">
                    <div className="medical-tools">
                        <input
                            type="text"
                            placeholder="Search by animal or treatment..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <select
                            value={typeFilter}
                            onChange={(event) => setTypeFilter(event.target.value)}
                        >
                            <option value="All">All Record Types</option>
                            <option value="Vaccination">Vaccination</option>
                            <option value="Checkup">Checkup</option>
                            <option value="Treatment">Treatment</option>
                            <option value="Surgery">Surgery</option>
                            <option value="Medication">Medication</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="medical-record-list">
                        {filteredRecords.length === 0 ? (
                            <p className="medical-empty">
                                No medical records found
                            </p>
                        ) : (
                            filteredRecords.map((record) => {
                                const animal = animals.find(
                                    (item) => item.id === Number(record.animalId)
                                );

                                return (
                                    <div className="medical-record-card" key={record.id}>
                                        <div>
                                            <h3>{animal ? animal.name : 'Unknown Animal'}</h3>
                                            <span className="medical-record-type">
                                                {record.type}
                                            </span>
                                            <p><strong>Date:</strong> {record.date}</p>
                                            <p><strong>Veterinarian:</strong> {record.veterinarian || 'Not specified'}</p>
                                            <p><strong>Treatment:</strong> {record.treatment}</p>
                                            <p><strong>Notes:</strong> {record.notes || 'None'}</p>
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

export default AdminMedicalRecords;