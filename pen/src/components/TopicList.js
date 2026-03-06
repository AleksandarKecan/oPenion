import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const TopicList = ({ filteredTopics =[], isForum, onLike }) => {
    return (
        <div className="topic-list">
            {filteredTopics.map(topic => (
                <div key={topic.id} className="topic-item">
                    <Link to={`/topic/${topic.id}`}>
                        <h3>{topic.title}</h3>
                    </Link>
                    <div className="topic-meta">
                        <p>By: {topic.author} | {topic.date} | Replies: {topic.replies} </p>
                        <button className="like-btn" onClick={() => onLike(topic.id)}>
                            {topic.liked ? <FaHeart color="#dc3545" /> : <FaRegHeart />}
                            <span>{topic.likes || 0}</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TopicList;