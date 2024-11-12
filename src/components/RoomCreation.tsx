import React, { useState } from 'react';
import { useRooms } from '../context/RoomContext';
import { Plus, Copy, ArrowRight } from 'lucide-react';

export const RoomCreation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const { createRoom } = useRooms();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim()) {
      const room = await createRoom(roomName.trim());
      setInviteCode(room.inviteCode);
    }
  };

  const copyInviteLink = () => {
    const link = `${window.location.origin}/join/${inviteCode}`;
    navigator.clipboard.writeText(link);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded transition duration-200"
      >
        <Plus className="w-4 h-4" />
        Create Room
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Create New Room</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        {!inviteCode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded transition duration-200 flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              Create Room
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Invite Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteCode}
                  readOnly
                  className="flex-1 px-4 py-2 rounded bg-white/5 border border-white/10 text-white"
                />
                <button
                  onClick={copyInviteLink}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded transition duration-200"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                setInviteCode('');
                setRoomName('');
              }}
              className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded transition duration-200"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};