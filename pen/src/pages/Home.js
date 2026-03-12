import TopicList from "../components/TopicList";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { topics as initialTopics } from "../data/topics";
import { useState, useEffect } from "react";

function Home() {
    const { user } = useAuth();
    const [galleryImages, setGalleryImages] = useState([]);


    const loadImages = () => {
        const savedImages = localStorage.getItem("galleryImages");
        if (savedImages) {
            setGalleryImages(JSON.parse(savedImages));
        }
    };

    useEffect(() => {
        loadImages();
        const handleStorageChange = () => {
            loadImages();
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
        
    }, []);
    
    return (
        <div className="home-page">
            <h1>Welcome to oPenion Forum!</h1>
            <div className={`home-section ${!user ? "blurred" : ""}`}>
                <Link to="/forum" className="section-link">
                    <h2>Last discussions:</h2>
                </Link>
                <TopicList filteredTopics={initialTopics.slice(0, 3)} isForum={false} />

            </div>
            <div className={`home-section ${!user ? "blurred" : ""}`}>
                <Link to="/gallery" className="section-link">
                    <h2>Gallery</h2>
                </Link>
                <div className="gallery-preview">
                    {galleryImages.slice(0, 3).map(img => (
                        img.url && <img key={img.id} src={img.url} alt={img.name} className="preview-image" />
                    ))}
                </div>
            </div>
     </div>
    );
}

export default Home;