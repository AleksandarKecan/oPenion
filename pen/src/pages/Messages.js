import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useMessages } from "../context/MessageContext";


function Messages() {
    const { user } = useAuth();
    const { messages, sendMessage, markAsRead } = useMessages();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [showNewMessage, setShowNewMessage] = useState(false);
    const [newMessage, setNewMessage] = useState({ to: "", content: "" });

    if (!user) {
        return <div className="messages-page">Please log in to see messages.</div>
    }

    return (
        <div className="messages-page">
            <h1>Messages</h1>
            <button
                className="new-message-btn"
                onClick={() => setShowNewMessage(true)}
            > + New Message</button>

            <div className="messages-container">
                <div className="messages-list">
                    {messages.length === 0 ? (
                        <p className="no-messages">No messages yet.</p>
                    ) : (
                        messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`message-item ${!msg.read ? "unread" : ""}`}
                                onClick={() => {
                                    setSelectedMessage(msg);
                                    if (!msg.read) markAsRead(msg.id);
                                }}
                            >
                                <div className="message-preview">
                                    <div className="message-header-preview">
                                        <strong>{msg.fromUsername}</strong>
                                        <button
                                            className="delete-message-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (window.confirm("Delete message?")) {
                                                    deleteMessage(msg.id);
                                                }
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        </div>
                                    <p>{msg.content.substring(0, 50)}...</p>
                                    <span className="message-time">{new Date(msg.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {selectedMessage && (
                    <div className="message-detail">
                        <div className="message-header">
                            <h3>From: {selectedMessage.fromUsername}</h3>
                            <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="message-content">{selectedMessage.content}</p>
                        <div className="message-reply">
                            <textarea
                                placeholder="Write a reply"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows="4" />
                            <button
                                onClick={() => {
                                    sendMessage(selectedMessage.fromUserId, replyText);
                                    setReplyText("");
                                }}
                            > Send Reply!</button>
                        </div>
                    </div>
                )}
            </div>
            {showNewMessage && (
                <div className="new-message-modal">
                    <div className="modal-content">
                        <h3>New Message</h3>
                        <input
                            type="text"
                            placeholder="To (username)"
                            value={newMessage.to}
                            onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })} />
                        <textarea
                            placeholder="Message"
                            value={newMessage.content}
                            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                            rows="5"
                        />
                        <div className="modal-actions">
                            <button onClick={() => setShowNewMessage(false)}>Cancel</button>
                            <button onClick={() => setShowNewMessage(false)}>Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Messages;