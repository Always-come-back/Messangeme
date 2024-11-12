export interface User {
  id: string;
  username: string;
  status: 'active' | 'away' | 'disabled';
  avatarUrl?: string;
}

export interface Room {
  id: string;
  name: string;
  createdBy: string;
  createdAt: number;
  inviteCode: string;
  participants: string[];
  type: 'room' | 'dm';
  isDm?: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
  roomId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  deleteAccount: () => void;
}

export interface RoomContextType {
  rooms: Room[];
  currentRoom: Room | null;
  createRoom: (name: string) => Promise<Room>;
  createDM: (userId: string) => Promise<Room>;
  joinRoom: (inviteCode: string) => Promise<void>;
  setCurrentRoom: (room: Room | null) => void;
  leaveRoom: (roomId: string) => Promise<void>;
}