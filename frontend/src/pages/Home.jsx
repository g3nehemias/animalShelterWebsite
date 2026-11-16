import { useState } from 'react';
import './Home.css';

const featuredAnimals = [
    {
        id: 1,
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600'
    },
    {
        id: 2,
        name: 'Luna',
        species: 'Cat',
        breed: 'Domestic Shorthair',
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600'
    },
    {
        id: 3,
        name: 'Max',
        species: 'Dog',
        breed: 'German Shepherd',
        image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600'
    }
];

function Home({ onBrowseAnimals, onNavigate }) {
    const [search, setSearch] = useState('');

    const filteredAnimals = featuredAnimals.filter((animal) =>
        '${animal.name} ${animal.species} ${animal.breed}'.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="home-page">

            <nav className="navbar">
                <div className="navbar-brand">
                    Animal Shelter Management System
                </div>

                <div className="navbar-links">
                    <button onClick={() => onNavigate('home')}>Home</button>
                    <button onClick={onBrowseAnimals}>Browse Animals</button>
                    <button onClick={() => onNavigate('applications')}>My Applications</button>
                    <button onClick={() => onNavigate('account')}>Account</button>
                </div>
            </nav>

            <main className="home-content">
                <section className="home-heading">
                    <h1>Available Animals for Adoption</h1>
                    <p>Meet your new best friend and give an animal a loving home.</p>
                </section>

                <section className="home-search">
                    <input
                        type="text"
                        placeholder="Search animals..."
                        value={search}
                        onChnage={(event) => setSearch(event.target.vale)}
                    />

                    <button type="button">
                        Search
                    </button>
                </section>

                <section className="featured-animals">
                    {filteredAnimals.length > 0 ? (
                        filteredAnimals.map((animal) => (
                            <article className="home-aniaml-card" key={animal.id}>
                                <img src={animal.image} alt={animal.name} />

                                <div className="home-animal-info">
                                    <h2>{animal.name}</h2>
                                    <p>{animal.species} / {animal.breed}</p>

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
                    <p className="empty-search">No animals found</p>
                    )}
                </section>

            </main>
        </div>
    );
}

export default Home;