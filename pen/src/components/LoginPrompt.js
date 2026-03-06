import { useNavigate } from "react-router-dom";

function LoginPrompt({ onClose }) {
    const navigate = useNavigate();
    const handleLogin = () => {
        onClose();
    };

    return (
        <div className="login-prompt-overlay">
            <div className="login-prompt-modal">
                <button className="close-btn" onClick={onClose}>X</button>
                <h3>Please Log In</h3>
                <p>You need to be logged in to view forum content.</p>
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default LoginPrompt;