import React from 'react';
import { useRooms } from '../context/RoomContext';
import { Users } from 'lucide-react';

export const RoomList: React.FC = () => {
  const { rooms, currentRoom, setCurrentRoom } = useRooms();

  const groupRooms = rooms.filter(room => !room.isDm);

  return (
    <div className="space-y-2">
      {groupRooms.map((room) => (
        <button
          key={room.id}
          onClick={() => setCurrentRoom(room)}
          className={`w-full text-left p-3 rounded transition duration-200 ${
            currentRoom?.id === room.id
              ? 'bg-white/20 text-white'
              : 'text-white/80 hover:bg-white/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{room.name}</span>
            <Users className="w-4 h-4 opacity-60" />
          </div>
        </button>
      ))}
    </div>
  );
};