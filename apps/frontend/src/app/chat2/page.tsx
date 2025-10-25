'use client';

import { useState, useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';

interface Message {
  _id: string;        // ← MongoDB uses _id
  username: string;
  content: string;
  time: string;
  createdAt?: string; // ← Optional: from MongoDB
}

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [joined, setJoined] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connect to backend
  useEffect(() => {
    const newSocket = io('http://localhost:8080', {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    // Receive real-time message
    newSocket.on('message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    // Receive chat history from DB
    newSocket.on('history', (history: Message[]) => {
      setMessages(history);
    });

    // Optional: Connection debug
    newSocket.on('connect', () => console.log('Connected to backend'));
    newSocket.on('connect_error', (err) => console.error('Connection error:', err));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinChat = () => {
    if (username.trim() && socket) {
      socket.emit('join', { username });
      setJoined(true);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket && joined) {
      socket.emit('sendMessage', { username, content: message });
      setMessage('');
    }
  };

  // === JOIN SCREEN ===
  if (!joined) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-96 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Join Chat</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && joinChat()}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            autoFocus
          />
          <button
            onClick={joinChat}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  // === MAIN CHAT UI ===
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center font-bold text-lg shadow-md">
        Chat Room — {username}{' '}
        <span className="text-sm font-normal opacity-90">({messages.length} messages)</span>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div
            key={msg._id}
            className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                msg.username === username
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <p className="font-semibold text-sm">{msg.username}</p>
              <p className="mt-1">{msg.content}</p>
              <p className="text-xs opacity-70 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(e)}
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}