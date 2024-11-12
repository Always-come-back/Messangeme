import React, { useState } from 'react';
import { useRooms } from '../context/RoomContext';
import { MessageSquare, UserPlus } from 'lucide-react';

export const DirectMessages: React.FC = () => {
  const { rooms, currentRoom, setCurrentRoom, createDM } = useRooms();
  const [isAddingDM, setIsAddingDM] = useState(false);
  const [username, setUsername] = useState('');

  const dmRooms = rooms.filter(room => room.isDm);

  const handleCreateDM = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      await createDM(username);
      setUsername('');
      setIsAddingDM(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-white/80">Direkt Mesajlar</h3>
        <button
          onClick={() => setIsAddingDM(!isAddingDM)}
          className="p-1 hover:bg-white/10 rounded transition duration-200"
        >
          <UserPlus className="w-4 h-4 text-white/80" />
        </button>
      </div>

      {isAddingDM && (
        <form onSubmit={handleCreateDM} className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı adı"
            className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/30"
          />
        </form>
      )}

      <div className="space-y-1">
        {dmRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => setCurrentRoom(room)}
            className={`w-full text-left p-2 rounded transition duration-200 ${
              currentRoom?.id === room.id
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 opacity-60" />
              <span className="truncate">{room.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};