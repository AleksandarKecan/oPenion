import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const MessageContext = createContext();


export const MessageProvider = ({ children }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState({});
    const [unreadConunt, setUnreadCount] = useState(0);

    useEffect(() => {
        if (user) {
            const savedMessages = localStorage.getItem(`messages_${user.id}`);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        }
    }, [user]);

    useEffect(() => {
        if (user && messages[user.id]) {
            const unread = messages[user.id].filter(msg => !msg.read).length;
            setUnreadCount(unread);
        } else {
            setUnreadCount(0);
        }
    }, [messages, user]);

    const sendMessage = (toUserId, content) => {
        const newMessage = {
            id: Date.now(),
            fromUserId: user.id,
            fromUsername: user.username,
            toUserId,
            content,
            timestamp: new Date().toISOString(),
            read: false
        };

        setMessages(prev => {
            const recipientMessages = [...(prev[toUserId] || []), newMessage];
            const senderMessages = [...(prev[user.id] || []), { ...newMessage, read: true }];
            const updated = {
                ...prev,
                [toUserId]: recipientMessages,
                [user.id]: senderMessages
            };
            localStorage.setItem(`messages_${user.id}`, JSON.stringify(updated));
            return updated;
        });
    };

    const deleteMessage = (messageId) => {
        setMessages(prev => {
            const userMessages = prev[user.id].filter(msg => msg.id !== messageId);
            const updated = { ...prev, [user.id]: userMessages };
            localStorage.setItem(`messages_${user.id}`, JSON.stringify(updated));
            return updated;
        });
    };

    const markAsRead = (messageId) => {
        setMessages(prev => {
            const userMessages = prev[user.id].map(msg =>
                msg.id === messageId ? { ...msg, read: true } : msg
            );
            const updated = { ...prev, [user.id]: userMessages };
            localStorage.setItem(`messages_${user.id}`, JSON.stringify(updated));
        });
    };

    return (
        <MessageContext.Provider value={{
            messages: messages[user?.id] || [],
            unreadConunt,
            sendMessage,
            markAsRead,
            deleteMessage
        }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => useContext(MessageContext);