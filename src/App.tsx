import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import { RoomProvider } from './context/RoomContext';
import { Layout } from './components/Layout';
import { AuthScreen } from './components/AuthScreen';
import { ChatScreen } from './components/ChatScreen';
import { useAuth } from './context/AuthContext';

const AppContent = () => {
  const { user } = useAuth();
  return user ? <ChatScreen /> : <AuthScreen />;
};

function App() {
  return (
    <AuthProvider>
      <RoomProvider>
        <MessageProvider>
          <Layout>
            <AppContent />
          </Layout>
        </MessageProvider>
      </RoomProvider>
    </AuthProvider>
  );
}

export default App;