import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function CommentSection({ topicId, currentUser }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentLikes, setCommentLikes] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem(`comments_${topicId}`);
        if (saved) setComments(JSON.parse(saved));

        const likes = localStorage.getItem(`commentLikes_${topicId}`);
        if (likes) setCommentLikes(JSON.parse(likes));
    }, [topicId]);

    useEffect(() => {
        localStorage.setItem(`comments_${topicId}`, JSON.stringify(comments));
    }, [comments, topicId]);

    useEffect(() => {
        localStorage.setItem(`commentLikes_${topicId}`, JSON.stringify(commentLikes));
    }, [commentLikes, topicId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !currentUser) return;

        const comment = {
            id: Date.now(),
            text: newComment,
            author: currentUser.username,
            date: new Date().toLocaleDateString()
        };

        setComments([...comments, comment]);
        setNewComment("");
    };

    const handleCommentLike = (commentId) => {
        setCommentLikes(prev => ({
            ...prev,
            [commentId]: {
                count: (prev[commentId]?.count || 0) + (prev[commentId]?.liked ? -1 : 1),
                liked: !prev[commentId]?.liked
            }
        }));
    };

return (
    <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        {currentUser && (
            <form onSubmit={handleCommentSubmit} className="comment-form">
                <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="3"
                    required
                />
                <button type="submit">Post Comment</button>
            </form>
        )}

        <div className="comments-list">
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-footer">
                        <div className="comment-header">
                        <p className="comment-meta">By {comment.author} | {comment.date}</p>
                            {currentUser && comment.author === currentUser.username && (
                                <button className="delete-comment-btn" onClick={() => {
                                    if (window.confirm("Delete this comment?")) {
                                        const updated = comments.filter(c => c.id !== comment.id);
                                        setComments(updated);
                                        localStorage.setItem(`comments_${topicId}`, JSON.stringify(updated));
                                    }
                                }}>
                                    <FaTrash />
                                </button>
                            )}
                            </div>
                            <button className="comment-like-btn" onClick={() => handleCommentLike(comment.id)}>
                                {commentLikes[comment.id]?.liked ?
                                <FaHeart color="#dc3545" /> :
                                <FaRegHeart />    
                                }
                                <span>{commentLikes[comment.id]?.count || 0}</span>
                            </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default CommentSection;