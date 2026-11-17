import './Home.css';

const featuredAnimals = [
    {
        id: 1,
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: '2 years',
        gender: 'Male',
        size: 'Large',
        image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600'
    },
    {
        id: 2,
        name: 'Luna',
        species: 'Cat',
        breed: 'Domestic Shorthair',
        age: '1 year',
        gender: 'Female',
        size: 'Small',
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600'
    },
    {
        id: 3,
        name: 'Max',
        species: 'Dog',
        breed: 'German Shepherd',
        age: '3 years',
        gender: 'Male',
        size: 'Large',
        image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600'
    }
];

function Home({ onBrowseAnimals, onNavigate }) {
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
                    <h1>Featured Animals</h1>
                    <p>Meet your new best friend and give an animal a loving home.</p>
                </section>

                <section className="featured-animals">
                    {featuredAnimals.map((animal) => (
                        <article className="home-animal-card" key={animal.id}>
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
                    ))}
                </section>
            </main>
        </div>
    );
}

export default Home;