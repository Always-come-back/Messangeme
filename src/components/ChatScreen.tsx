import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import { useRooms } from '../context/RoomContext';
import { Send, Wifi, WifiOff, Users, MessageCircle, Plus } from 'lucide-react';
import { UserSettings } from './UserSettings';
import { RoomCreation } from './RoomCreation';
import { DirectMessages } from './DirectMessages';
import { RoomList } from './RoomList';

export const ChatScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const { user } = useAuth();
  const { messages, addMessage, isConnected } = useMessages();
  const { rooms, currentRoom, setCurrentRoom } = useRooms();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user && currentRoom) {
      addMessage(message.trim(), user.username);
      setMessage('');
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const filteredMessages = messages.filter(msg => msg.roomId === currentRoom?.id);

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="lg:grid lg:grid-cols-4 gap-4 h-full relative">
        {/* Sidebar */}
        <div className={`
          lg:static lg:block
          fixed inset-y-0 left-0 w-3/4 z-30 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20 p-4
        `}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Sohbetler</h2>
            <button
              onClick={() => setIsCreatingRoom(true)}
              className="p-2 hover:bg-white/10 rounded-full transition duration-200"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="space-y-4">
            <DirectMessages />
            
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-sm font-medium text-white/80 mb-2">Odalar</h3>
              <RoomList />
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20 flex flex-col">
          <div className="p-4 border-b border-white/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-full"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
              <h2 className="text-xl font-semibold text-white">
                {currentRoom ? currentRoom.name : 'Bir sohbet seçin'}
              </h2>
              {isConnected ? (
                <Wifi className="w-4 h-4 text-green-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-400" />
              )}
            </div>
            <UserSettings />
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentRoom && filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === user?.username ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    msg.sender === user?.username
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-white'
                  } transition-all duration-200 hover:bg-opacity-30`}
                >
                  <div className="flex justify-between items-center gap-4 text-sm opacity-75 mb-1">
                    <span>{msg.sender}</span>
                    <span className="text-xs">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div className="break-words">{msg.text}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-white/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  !currentRoom
                    ? "Sohbet başlatmak için bir oda seçin..."
                    : !isConnected
                    ? "Bağlanıyor..."
                    : "Mesajınızı yazın..."
                }
                disabled={!isConnected || !currentRoom}
                className="flex-1 px-4 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!isConnected || !currentRoom || !message.trim()}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {isCreatingRoom && (
        <RoomCreation onClose={() => setIsCreatingRoom(false)} />
      )}
    </div>
  );
};