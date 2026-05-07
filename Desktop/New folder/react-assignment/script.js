const { useState } = React;


function Button({ label, variant = 'primary', onClick }) {
    const baseClasses = 'btn';
    const variantClasses = variant === 'primary' ? 'btn primary' : variant === 'secondary' ? 'btn secondary' : 'btn';
    
    return (
        <button className={variantClasses} onClick={onClick}>
            {label}
        </button>
    );
}


function Navbar() {
    return (
        <nav className="navbar">
            <h1>MyApp</h1>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    );
}

function Hero() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div className="hero">
            <h1>Welcome to Our Landing Page</h1>
            <p>
                This is a simple React landing page built with components and props. 
                Click the counter button to see React state in action!
            </p>
            <div className="buttons">
                <Button label="Login" />
                <Button label="Register" variant="secondary" />
                <Button 
                    label={`Learn More (Count: ${count})`} 
                    variant="primary" 
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}


function Footer() {
    return (
        <footer className="footer">
            <p>&amp;copy; 2024 MyApp. Built with React and Props.</p>
        </footer>
    );
}


function App() {
    return (
        <div className="app">
            <Navbar />
            <Hero />
            <Footer />
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
