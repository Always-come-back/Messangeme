import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Hoş Geldiniz' : 'Hesap Oluştur'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Kullanıcı adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>
        <p className="mt-4 text-center text-white/80">
          {isLogin ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:underline font-semibold"
          >
            {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </p>
      </div>
    </div>
  );
};