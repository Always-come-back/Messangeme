import React, { createContext, useContext, useState } from 'react';
import { Room, RoomContextType } from '../types';

const RoomContext = createContext<RoomContextType | null>(null);

export const useRooms = () => {
  const context = useContext(RoomContext);
  if (!context) throw new Error('useRooms must be used within RoomProvider');
  return context;
};

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  const createRoom = async (name: string): Promise<Room> => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name,
      createdBy: 'user-id', // Replace with actual user ID
      createdAt: Date.now(),
      inviteCode: Math.random().toString(36).substring(2, 8),
      participants: ['user-id'], // Replace with actual user ID
    };
    setRooms(prev => [...prev, newRoom]);
    return newRoom;
  };

  const joinRoom = async (inviteCode: string) => {
    // Implementation for joining a room
  };

  const leaveRoom = async (roomId: string) => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
    if (currentRoom?.id === roomId) {
      setCurrentRoom(null);
    }
  };

  return (
    <RoomContext.Provider value={{ 
      rooms, 
      currentRoom, 
      createRoom, 
      joinRoom, 
      setCurrentRoom,
      leaveRoom 
    }}>
      {children}
    </RoomContext.Provider>
  );
};