import { useState } from "react";

function TopicForm({ onTopicAdded }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        const newTopic = {
            id: Date.now(),
            title,
            content,
            author: "Current User",
            date: new Date().toLocaleDateString(),
            replies: 0
        };

        onTopicAdded(newTopic);
        setTitle("");
        setContent("");
    };

    return (
        <div className="topic-form">
            <h3>Create New Topic</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} rows="4" required />
                <button type="submit" className="submit-topic-btn">Add Topic</button>
            </form>
        </div>
    );
}

export default TopicForm