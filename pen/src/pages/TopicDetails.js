import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/CommentSection";


function TopicDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const [topic, setTopic] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");


    useEffect(() => {
        const allTopics = JSON.parse(localStorage.getItem("forumTopics")) || [];
        const foundTopic = allTopics.find(t => t.id === parseInt(id));
        setTopic(foundTopic);
    }, [id]);

    if (!topic) return <div>Loading...</div>;

    return (
        <div className="topic-details">
            <h1>{topic.title}</h1>
            <p className="topic-meta">By {topic.author} | {topic.date}</p>
            <CommentSection topicId={id} currentUser={user} />
        </div>
    );
}

export default TopicDetails;