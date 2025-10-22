'use client';

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState('');
  // ✅ FIXED: Initialize with empty string array
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log('🔌 Connecting to backend...');
    const socketIo = io('http://localhost:8080');
    setSocket(socketIo);

    // ✅ DEBUG: Connection success
    socketIo.on('connect', () => {
      console.log('✅ CONNECTED TO BACKEND!');
    });

    // ✅ DEBUG: Connection failed
    socketIo.on('connect_error', (err) => {
      console.log('❌ CONNECTION FAILED:', err.message);
    });
    
    socketIo.on('message', (msg: string) => {
      // ✅ FIXED: Explicit type in callback
      setMessages((prev: string[]) => [...prev, msg]);
    });

    return () => void socketIo.close();
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg, i) => (
          <div key={i} className="bg-blue-500 text-white p-2 mb-2 rounded">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-white">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          className="w-full p-2 border rounded"
        />
      </form>
    </div>
  );
}