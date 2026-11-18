
import { useState } from 'react';
import './AdminInventory.css';

function AdminInventory({
    inventory,
    onNavigate,
    onAddItem,
    onUpdateItem,
    onDeleteItem,
    onLogout
}) {
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const emptyForm = {
        name: '',
        category: 'Food',
        quantity: '',
        unit: 'Units',
        minimumStock: '',
        description: ''
    };

    const [formData, setFormData] = useState(emptyForm);

    const filteredInventory = inventory.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === 'All' || item.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    const lowStockCount = inventory.filter(
        (item) => item.quantity <= item.minimumStock
    ).length;

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    }

    function handleAddClick() {
        setEditingItem(null);
        setFormData(emptyForm);
        setShowForm(true);
    }

    function handleEditClick(item) {
        setEditingItem(item);
        setFormData({
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            unit: item.unit,
            minimumStock: item.minimumStock,
            description: item.description
        });
        setShowForm(true);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            !formData.name.trim() ||
            formData.quantity === '' ||
            formData.minimumStock === ''
        ) {
            return;
        }

        const itemData = {
            ...formData,
            quantity: Number(formData.quantity),
            minimumStock: Number(formData.minimumStock)
        };

        if (editingItem) {
            onUpdateItem(editingItem.id, itemData);
        } else {
            onAddItem({
                ...itemData,
                id: Date.now()
            });
        }

        setFormData(emptyForm);
        setEditingItem(null);
        setShowForm(false);
    }

    function handleCancel() {
        setFormData(emptyForm);
        setEditingItem(null);
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
                    <button
                        className="admin-menu-item"
                        onClick={() => onNavigate('admin-dashboard')}
                    >
                        Dashboard
                    </button>

                    <button
                        className="admin-menu-item"
                        onClick={() => onNavigate('admin-animals')}
                    >
                        Animal Management
                    </button>

                    <button
                        className="admin-menu-item"
                        onClick={() => onNavigate('admin-applications')}
                    >
                        Applications
                    </button>

                    <button
                        className="admin-menu-item"
                        onClick={() => onNavigate('admin-medical-records')}
                    >
                        Medical Records
                    </button>

                    <button
                        className="admin-menu-item"
                        onClick={() => onNavigate('admin-appointments')}
                    >
                        Appointments
                    </button>

                    <button className="admin-menu-item active">
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
                        <h1>Inventory Management</h1>
                        <p>Track and manage shelter supplies.</p>
                    </div>

                    <button
                        className="inventory-add-button"
                        onClick={handleAddClick}
                    >
                        + Add Inventory Item
                    </button>
                </header>

                <section className="inventory-stats">
                    <div className="inventory-stat-card">
                        <h3>Total Items</h3>
                        <p>{inventory.length}</p>
                    </div>

                    <div className="inventory-stat-card">
                        <h3>Low Stock Items</h3>
                        <p>{lowStockCount}</p>
                    </div>

                    <div className="inventory-stat-card">
                        <h3>Categories</h3>
                        <p>
                            {[...new Set(inventory.map((item) => item.category))].length}
                        </p>
                    </div>
                </section>

                {showForm && (
                    <form
                        className="inventory-form"
                        onSubmit={handleSubmit}
                    >
                        <h2>
                            {editingItem ? 'Edit Inventory Item' : 'Add New Item'}
                        </h2>

                        <label>Item Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter item name"
                            required
                        />

                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="Food">Food</option>
                            <option value="Medical">Medical Supplies</option>
                            <option value="Cleaning">Cleaning Supplies</option>
                            <option value="Bedding">Bedding</option>
                            <option value="Toys">Toys</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Other">Other</option>
                        </select>

                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            min="0"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Unit</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                        >
                            <option value="Units">Units</option>
                            <option value="Bags">Bags</option>
                            <option value="Boxes">Boxes</option>
                            <option value="Bottles">Bottles</option>
                            <option value="Pounds">Pounds</option>
                            <option value="Gallons">Gallons</option>
                        </select>

                        <label>Minimum Stock Level</label>
                        <input
                            type="number"
                            name="minimumStock"
                            min="0"
                            value={formData.minimumStock}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Additional information..."
                        />

                        <div className="inventory-form-actions">
                            <button type="submit">
                                {editingItem ? 'Save Changes' : 'Add Item'}
                            </button>

                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                <section className="inventory-content">
                    <div className="inventory-tools">
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        <select
                            value={categoryFilter}
                            onChange={(event) => setCategoryFilter(event.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Food">Food</option>
                            <option value="Medical">Medical Supplies</option>
                            <option value="Cleaning">Cleaning Supplies</option>
                            <option value="Bedding">Bedding</option>
                            <option value="Toys">Toys</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="inventory-list">
                        {filteredInventory.length === 0 ? (
                            <p className="inventory-empty">
                                No inventory items found.
                            </p>
                        ) : (
                            filteredInventory.map((item) => {
                                const isLowStock =
                                    item.quantity <= item.minimumStock;

                                return (
                                    <div
                                        className="inventory-card"
                                        key={item.id}
                                    >
                                        <div className="inventory-info">
                                            <h3>{item.name}</h3>
                                            <p><strong>Category:</strong> {item.category}</p>
                                            <p>
                                                <strong>Quantity:</strong>{' '}
                                                {item.quantity} {item.unit}
                                            </p>
                                            <p>
                                                <strong>Minimum Stock:</strong>{' '}
                                                {item.minimumStock} {item.unit}
                                            </p>
                                            <p>
                                                <strong>Description:</strong>{' '}
                                                {item.description || 'None'}
                                            </p>

                                            <span
                                                className={`inventory-status ${
                                                    isLowStock ? 'low-stock' : 'in-stock'
                                                }`}
                                            >
                                                {isLowStock ? 'Low Stock' : 'In Stock'}
                                            </span>
                                        </div>

                                        <div className="inventory-actions">
                                            <button
                                                onClick={() => handleEditClick(item)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => onDeleteItem(item.id)}
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

export default AdminInventory;