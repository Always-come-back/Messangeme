import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, User, LogOut, Trash2 } from 'lucide-react';

export const UserSettings: React.FC = () => {
  const { user, updateUser, logout, deleteAccount } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [status, setStatus] = useState(user?.status || 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ username, status: status as 'active' | 'away' | 'disabled' });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-white/10 rounded-full transition duration-200"
      >
        <Settings className="w-5 h-5 text-white" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Account Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
            >
              <option value="active">Active</option>
              <option value="away">Away</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="submit"
              className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded transition duration-200"
            >
              Save Changes
            </button>
          </div>

          <div className="border-t border-white/10 pt-4 mt-4">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-2 text-white/80 hover:text-white transition duration-200 p-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
              <button
                type="button"
                onClick={deleteAccount}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition duration-200 p-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};