// frontend/src/components/Chatbox.js
import React, { useState } from 'react';
import axios from 'axios';

const Chatbox = () => {
    const [input, setInput] = useState('');       // To hold user input
    const [messages, setMessages] = useState([]); // To hold the conversation history

    // Function to send the user's query to the backend
    const sendMessage = async () => {
        if (input.trim() === '') return;
    
        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);
    
        // Send the input to the FastAPI backend
        try {
            const response = await axios.post('http://127.0.0.1:8000/query/', {
                user_input: input
            });
    
            const botMessage = { sender: 'bot', text: JSON.stringify(response.data) };
            setMessages([...messages, userMessage, botMessage]);
    
        } catch (error) {
            const errorMessage = { sender: 'bot', text: 'Error: Something went wrong' };
            setMessages([...messages, userMessage, errorMessage]);
        }
    
        setInput('');  // Clear the input field
    };

    return (
        <div className="chatbox">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-section">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask me something..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbox;
