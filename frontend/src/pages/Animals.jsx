import { useState } from 'react';
import './Animals.css';

function Animals({ onNavigate, animals }) {
    const [search, setSearch] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('All');
    const [sizeFilter, setSizeFilter] = useState('All');

    const filteredAnimals = animals.filter((animal) => {
        const searchText = search.trim().toLowerCase();

        const matchesSearch = [
            animal.name,
            animal.species,
            animal.breed,
            animal.age,
            animal.gender,
            animal.size
        ].some((value) => value.toLowerCase().includes(searchText));
            
        const matchesSpecies =
            speciesFilter === "All" || animal.species === speciesFilter;

        const matchesSize = 
            sizeFilter === "All" || animal.size === sizeFilter;

        return matchesSearch && matchesSpecies && matchesSize;
    });

    return (
        <div className="animals-page">

            <nav className="navbar">
                <div className = "navbar-brand">
                    Animal Shelter Management System
                </div>

                <div className="navbar-links">
                    <button onClick={() => onNavigate('home')}>Home</button>
                    <button onClick={() => onNavigate('animals')}>Browse Animals</button>
                    <button onClick={() => onNavigate('applications')}>My Applications</button>
                    <button onClick={() => onNavigate('account')}>Account</button>
                </div>
            </nav>

            <header className="animals-header">
                <h1>Find Your Best New Friend</h1>
                <p>Browse our animals looking for their forever homes</p>
            </header>

            <main className="animals-content">

                <section className="animals-filters">
                    <input
                        type="text"
                        placeholder="Search by name or breed..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <select 
                        value={speciesFilter}
                        onChange={(event) => setSpeciesFilter(event.target.value)}
                    >
                        <option value="All">All Animals</option>
                        <option value="Dog">Dogs</option>
                        <option value="Cat">Cats</option>
                    </select>

                    <select
                        value={sizeFilter}
                        onChange={(event) => setSizeFilter(event.target.value)}
                    >
                        <option value="All">All Sizes</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </section>

                <section className="animals-grid">
                    {filteredAnimals.length > 0 ? (
                        filteredAnimals.map((animal) => (
                            <article className="animal-card" key={animal.id}>
                                <img src={animal.image} alt={animal.name} />

                                <div className="animal-card-info">
                                    <h2>{animal.name}</h2>
                                    <p>{animal.breed}</p>
                                    <p>{animal.age} {animal.gender}</p>
                                    <p>{animal.size} {animal.species}</p>

                                    <button 
                                        type="button"
                                        onClick={() => onNavigate('animal-details', animal)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </article>
                        ))
                    ) : (
                        <p className="no-animals">
                            No animals match your search
                        </p>
                    )}
                </section>

            </main>
        </div>
    );
}

export default Animals;
