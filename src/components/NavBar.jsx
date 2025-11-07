import { Link } from "react-router-dom";
import "../css/NavBar.css";

export default function NavBar() {
    return ( <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">📽️🎞️🍿</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>
    </nav>
    );
}