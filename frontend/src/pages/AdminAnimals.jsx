
import { useState } from 'react';
import './AdminAnimals.css';

const emptyAnimal = {
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    size: 'Medium',
    image: '',
    status: 'Available'
};

function AdminAnimals({
    animals,
    onNavigate,
    onSaveAnimal,
    onArchiveAnimal,
    onLogout
}) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showArchived, setShowArchived] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingAnimal, setEditingAnimal] = useState(null);
    const [formData, setFormData] = useState(emptyAnimal);

    const filteredAnimals = animals.filter((animal) => {
        const searchText = search.toLowerCase();

        const matchesSearch = [
            animal.name,
            animal.species,
            animal.breed
        ].some((value) =>
            value.toLowerCase().includes(searchText)
        );

        const matchesArchive = showArchived
            ? animal.archived
            : !animal.archived;

        const matchesStatus =
            statusFilter === 'All' ||
            animal.status === statusFilter;

        return matchesSearch && matchesArchive && matchesStatus;
    });

    function openAddForm() {
        setEditingAnimal(null);
        setFormData(emptyAnimal);
        setShowForm(true);
    }

    function openEditForm(animal) {
        setEditingAnimal(animal);
        setFormData({
            name: animal.name,
            species: animal.species,
            breed: animal.breed,
            age: animal.age,
            gender: animal.gender,
            size: animal.size,
            image: animal.image || '',
            status: animal.status
        });
        setShowForm(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSaveAnimal({
            ...formData,
            id: editingAnimal ? editingAnimal.id : Date.now(),
            archived: editingAnimal ? editingAnimal.archived : false
        });

        setShowForm(false);
        setEditingAnimal(null);
        setFormData(emptyAnimal);
    }

    function handleArchive(animal) {
        const action = animal.archived ? 'restore' : 'archive';

        if (window.confirm(`Are you sure you want to ${action} ${animal.name}?`)) {
            onArchiveAnimal(animal.id);
        }
    }

    return (
        <div className="admin-page">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>Shelter Admin</h2>
                    <p>Management System</p>
                </div>

                <nav className="admin-menu">
                    <button
                        className="admin-menu-item"
                        onClick={() => onNavigate('admin-dashboard')}
                    >
                        Dashboard
                    </button>

                    <button className="admin-menu-item active">
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
                    
                    <button className="admin-menu-item" disabled>Appointments</button>
                    <button className="admin-menu-item" disabled>Inventory</button>
                    <button className="admin-menu-item" disabled>User Management</button>
                </nav>

                <button
                    className="admin-logout"
                    onClick={() => onNavigate('login')}
                >
                    Log Out
                </button>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Animal Management</h1>
                        <p>Add, update, and manage shelter animals.</p>
                    </div>

                    <button
                        className="add-animal-button"
                        onClick={openAddForm}
                    >
                        + Add New Animal
                    </button>
                </header>

                <section className="animal-management-tools">
                    <input
                        type="text"
                        placeholder="Search by name, species, or breed..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Available">Available</option>
                        <option value="Pending">Pending</option>
                        <option value="Adopted">Adopted</option>
                    </select>

                    <button
                        className="archive-toggle-button"
                        onClick={() => setShowArchived(!showArchived)}
                    >
                        {showArchived ? 'View Active Animals' : 'View Archived Animals'}
                    </button>
                </section>

                {showForm && (
                    <section className="animal-form-card">
                        <h2>{editingAnimal ? 'Edit Animal' : 'Add New Animal'}</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="animal-form-grid">
                                <div>
                                    <label>Animal Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label>Species</label>
                                    <select
                                        name="species"
                                        value={formData.species}
                                        onChange={handleChange}
                                    >
                                        <option>Dog</option>
                                        <option>Cat</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Breed</label>
                                    <input
                                        name="breed"
                                        value={formData.breed}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label>Age</label>
                                    <input
                                        name="age"
                                        placeholder="Example: 2 years"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label>Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Size</label>
                                    <select
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                    >
                                        <option>Small</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Adoption Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option>Available</option>
                                        <option>Pending</option>
                                        <option>Adopted</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Image URL</label>
                                    <input
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="Paste an image URL"
                                    />
                                </div>
                            </div>

                            <div className="animal-form-actions">
                                <button
                                    type="button"
                                    className="cancel-animal-button"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="save-animal-button">
                                    {editingAnimal ? 'Save Changes' : 'Add Animal'}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                <section className="admin-animal-list">
                    <div className="animal-list-heading">
                        <h2>{showArchived ? 'Archived Animals' : 'Shelter Animals'}</h2>
                        <span>{filteredAnimals.length} animals</span>
                    </div>

                    {filteredAnimals.length === 0 ? (
                        <div className="empty-animal-list">
                            No animals found.
                        </div>
                    ) : (
                        <div className="admin-animal-grid">
                            {filteredAnimals.map((animal) => (
                                <article className="admin-animal-card" key={animal.id}>
                                    {animal.image ? (
                                        <img src={animal.image} alt={animal.name} />
                                    ) : (
                                        <div className="animal-image-placeholder">
                                            No Image
                                        </div>
                                    )}

                                    <div className="admin-animal-info">
                                        <div className="animal-card-heading">
                                            <h3>{animal.name}</h3>
                                            <span className={`animal-status ${animal.status.toLowerCase()}`}>
                                                {animal.status}
                                            </span>
                                        </div>

                                        <p>{animal.breed}</p>
                                        <p>{animal.species} · {animal.age} · {animal.gender}</p>
                                        <p>Size: {animal.size}</p>

                                        <div className="admin-animal-actions">
                                            <button
                                                onClick={() => openEditForm(animal)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="archive-animal-button"
                                                onClick={() => handleArchive(animal)}
                                            >
                                                {animal.archived ? 'Restore' : 'Archive'}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default AdminAnimals;
