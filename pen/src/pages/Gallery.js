import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPrompt from "../components/LoginPrompt";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";


function Gallery() {
    const { user } = useAuth();
    const [showPrompt, setShowPrompt] = useState(false);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const savedImages = localStorage.getItem("galleryImages");
        console.log("ucitavam slike:", savedImages)
        if (savedImages) {
            setImages(JSON.parse(savedImages));
        } else {
            setImages([]);
            localStorage.setItem("galleryImages", JSON.stringify([]));
        }
    }, []);

    useEffect(() => {
            localStorage.setItem("galleryImages", JSON.stringify(images));
        }, [images]);


    const handleLike = (imageId) => {
        setImages(prevImages => prevImages.map(img => img.id === imageId ? {
            ...img,
            likes: (img.likes || 0) + (img.liked ? -1 : 1),
            liked: !img.liked
        }
            : img
        ));
    };
    
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploading(true);
        const readers = files.map(file => {
            return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
            resolve({
                
            id: Date.now() + Math.random(),
            name: file.name,
            url: reader.result,
            size: file.size,
            type: file.type,
            likes: 0,
            liked: false
        });
    };
    reader.readAsDataURL(file);
});
});
Promise.all(readers).then(newImages => {
    setImages(prev => [...newImages, ...prev]);
    setUploading(false);
});
e.target.value = "";
};
    const openImageModal = (image) => {
        setSelectedImage(image);
    };
    const closeImageModal = () => {
        setSelectedImage(null);
    };

    if (!user) { 
        return (
            <>
                <div className="gallery-page-blur">
                    <h1>Gallery</h1>
                    <p>Sign in to view and upload images.</p>
                </div>
                <LoginPrompt onClose={() => setShowPrompt(false)} />
            </>
        );
    }

    return (
        <div className="gallery-page">
            <h1>Gallery</h1>
            <div className="gallery-header">
                <h2>Your images</h2>
                <div className="upload-container">
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        style={{display:"none"}}
                    />
                    <button
                        className="upload-btn"
                        onClick={() => document.getElementById("imageUpload").click()}
                        disabled={uploading}>
                        {uploading ? "Uploading..." : "+ Upload Images"}
                    </button>
                </div>
            </div>
            <div className="gallery-grid">
                {images.length === 0 ? (
                    <p className="no-image">No images yet. Click "Upload Image" to add new images.</p>
                ) : (
                        images.map((image) => (
                            <div key={image.id} className="gallery-item" onClick={() => openImageModal(image)}>
                                <img src={image.url} alt={image.name} className="gallery-image" />
                                <span className="image-name">{image.name}</span>
                                <button className="gallery-like-btn" onClick={(e) => { e.stopPropagation(); handleLike(image.id); }}>
                                    {image.liked ? <FaHeart color="#dc3545" /> : <FaRegHeart />}
                                    <span>{image.likes || 0}</span>
                                </button>
                                <button className="delete-image-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm("Delete this image?")) {
                                        const updated = images.filter(img => img.id !== image.id);
                                        setImages(updated);
                                    }}}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                )}
            </div>
            {selectedImage && (
            <div className="image-modal" onClick={closeImageModal}>
                    <span className="close-modal" onClick={closeImageModal}>&times;</span>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <img src={selectedImage.url} alt={selectedImage.name} className="modal-image" />
                    <p className="modal-image-name">{selectedImage.name}</p>
                </div>
            </div>
        )}
        </div>
    );
}

export default Gallery;