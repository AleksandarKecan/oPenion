import { useState } from "react";
import { useAuth } from "../context/AuthContext";


function Profile() {
    const { user, logout } = useAuth();
    const[isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");


    const handleSave = () => {
        const updatedUser = { ...user, username, email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        window.location.reload();
    };

    if (!user) {
        return <div className="profile-page">Please log in to view your profile.</div>
    }

    return (
        <div className="profile-page">
            <h1 className="profile-title">My profile</h1>
            <div className="profile-card">
                {!isEditing ? (
                    <>
                        <div className="profile-info">
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
                        </div>
                        <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </>
                ) : (
                    <>
                        <div className="profile-edit">
                                <label>
                                    Username:
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="New Username"
                                    />
                                </label>
                                <label>
                                    Password:
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="New Password"
                                    />
                                </label>
                            </div>
                            <div className="profile-actions">
                                <button className="save-btn" onClick={handleSave}>Save</button>
                                <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                    </>
                )}
            </div>
        </div>

    );
}

export default Profile;