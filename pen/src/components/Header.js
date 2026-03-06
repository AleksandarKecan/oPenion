import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcKey } from "react-icons/fc";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();
    const [isLogInOpen, setIsLogInOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);



    const handleProfileClick = () => {
        navigate("/profile");
    };


    return(
        <div className="header-overlay">
            <div className="header-buttons">
                {!user ? (
                    <>
                        <button className="header-sign-in-button" onClick={() => setIsLogInOpen(true)}><FcKey />Sign In</button>
                        <button className="create-account-button" onClick={() => setIsRegisterOpen(true)}> 📄 Create Account</button>
                    </>
                ) : (
                        <>
                            <span className="welcome-link" onClick={handleProfileClick}>Wellcome {user?.username || user?.email}</span>
                        <nav className="center-nav">
                                <Link to="/">Home</Link>
                                <Link to="/forum">Forum</Link>
                                <Link to="/gallery">Gallery</Link>
                            </nav>
                            <button className="theme-toggle" onClick={toggleDarkMode}>
                                {darkMode ? <FaSun /> : <FaMoon />}
                            </button>
                            <button className="sign-out-btn" onClick={logout}>Sign Out</button>
                    </>
                )}
            </div>
            {isLogInOpen && <Login onClose={() => setIsLogInOpen(false)} />}
            {isRegisterOpen && <Register onClose={() => setIsRegisterOpen(false)} />}
        </div>
    );
}

export default Header;