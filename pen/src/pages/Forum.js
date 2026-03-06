import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TopicList from "../components/TopicList";
import LoginPrompt from "../components/LoginPrompt";
import TopicForm from "../components/TopicForm";
import { topics as initialTopics } from "../data/topics";

function Forum() {
    const { user } = useAuth();
    const [showPrompt, setShowPrompt] = useState(false);
    const [topics, setTopics] = useState(initialTopics);
    const [searchTerm, setSearchTerm] = useState("");


    const filteredTopics = topics.filter(topic =>
        topic.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        topic.content.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    const handleTopicsAdded = (newTopic) => {
        const updatedTopics = [newTopic, ...topics];
        setTopics(updatedTopics);
        localStorage.setItem("forumTopics", JSON.stringify(updatedTopics));
    };

    const handleLike = (topicId) => {
        setTopics(prevTopics => prevTopics.map(topic => topic.id === topicId ? {
            ...topic, likes: (topic.likes || 0) + (topic.liked ? -1 : 1),
            liked: !topic.liked
        }
            : topic
        )
        );
    };

    if (!user) { 
        return (
            <>
                <div className="search-bar">
                    <input 
                    type="text"
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} /> 
                </div>
            <div className="forum-page-blur">
                <h1>Forum Discussions</h1>
                <p>This page is used for discussions.</p>
                <div className="forum-topics">
                    <h2>Subjects</h2>
                    <TopicList filteredTopics={filteredTopics} isForum={true} />
                    </div>
                    </div>
                <LoginPrompt onClose={() => setShowPrompt(false)} />
            </>
        );
    }
    return (
        <div className="forum-page">
            <h1>Forum Discussions</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search topics"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <TopicForm onTopicAdded={handleTopicsAdded} />
        <div className="forum-header">
            <h2>All topics</h2>
                <button className="new-topic-btn">+ New Topic</button>
            </div>
        <div className="forum-topics">
                <TopicList filteredTopics={filteredTopics} isForum={true} onLike={handleLike} />
        </div>
        </div>
    );
}

export default Forum;