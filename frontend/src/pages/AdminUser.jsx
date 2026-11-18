
import { useState } from 'react';
import './AdminUsers.css';

function AdminUsers({
    users,
    onNavigate,
    onAddUser,
    onUpdateUser,
    onDeleteUser,
    onLogout
}) {
    const emptyForm = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'Adopter',
        status: 'Active'
    };

    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState(emptyForm);

    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;

        const matchesSearch =
            fullName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const matchesRole =
            roleFilter === 'All' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    }

    function handleAddClick() {
        setEditingUser(null);
        setFormData(emptyForm);
        setShowForm(true);
    }

    function handleEditClick(user) {
        setEditingUser(user);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone || '',
            role: user.role,
            status: user.status
        });
        setShowForm(true);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const userData = {
            ...formData,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim()
        };

        if (editingUser) {
            onUpdateUser(editingUser.id, userData);
        } else {
            onAddUser({
                ...userData,
                id: Date.now()
            });
        }

        setFormData(emptyForm);
        setEditingUser(null);
        setShowForm(false);
    }

    function handleCancel() {
        setFormData(emptyForm);
        setEditingUser(null);
        setShowForm(false);
    }

    function handleToggleStatus(user) {
        onUpdateUser(user.id, {
            status: user.status === 'Active' ? 'Inactive' : 'Active'
        });
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

                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-appointments')}>
                        Appointments
                    </button>

                    <button className="admin-menu-item"
                        onClick={() => onNavigate('admin-inventory')}>
                        Inventory
                    </button>

                    <button className="admin-menu-item active">
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
                        <h1>User Management</h1>
                        <p>Manage shelter accounts and permissions.</p>
                    </div>

                    <button
                        className="users-add-button"
                        onClick={handleAddClick}
                    >
                        + Add User
                    </button>
                </header>

                <section className="users-stats">
                    <div className="users-stat-card">
                        <h3>Total Users</h3>
                        <p>{users.length}</p>
                    </div>

                    <div className="users-stat-card">
                        <h3>Active Users</h3>
                        <p>{users.filter((user) => user.status === 'Active').length}</p>
                    </div>

                    <div className="users-stat-card">
                        <h3>Administrators</h3>
                        <p>{users.filter((user) => user.role === 'Admin').length}</p>
                    </div>
                </section>

                {showForm && (
                    <form className="users-form" onSubmit={handleSubmit}>
                        <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>

                        <label>First Name</label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Last Name</label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />

                        <label>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                            <option value="Adopter">Adopter</option>
                        </select>

                        <label>Account Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <div className="users-form-actions">
                            <button type="submit">
                                {editingUser ? 'Save Changes' : 'Add User'}
                            </button>

                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                <section className="users-content">
                    <div className="users-tools">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        <select
                            value={roleFilter}
                            onChange={(event) => setRoleFilter(event.target.value)}
                        >
                            <option value="All">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                            <option value="Adopter">Adopter</option>
                        </select>
                    </div>

                    <div className="users-list">
                        {filteredUsers.length === 0 ? (
                            <p className="users-empty">No users found.</p>
                        ) : (
                            filteredUsers.map((user) => (
                                <div className="user-card" key={user.id}>
                                    <div className="user-info">
                                        <h3>{user.firstName} {user.lastName}</h3>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
                                        <p><strong>Role:</strong> {user.role}</p>

                                        <span className={`user-status ${
                                            user.status === 'Active' ? 'user-active' : 'user-inactive'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </div>

                                    <div className="users-actions">
                                        <button onClick={() => handleEditClick(user)}>
                                            Edit
                                        </button>

                                        <button onClick={() => handleToggleStatus(user)}>
                                            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        </button>

                                        <button onClick={() => onDeleteUser(user.id)}>
                                            Delete
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

export default AdminUsers;
