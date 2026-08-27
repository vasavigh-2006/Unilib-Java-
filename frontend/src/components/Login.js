import React, { useState } from 'react';

function Login({ onLogin, loading }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await onLogin(username, password);
    } catch (error) {
      setLoginError(error.message || 'Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center library-background p-4">
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-amber-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-1">🏛️ UniLib</h1>
          <p className="text-sm font-medium text-amber-800/80">University Library Portal</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 text-sm"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Need access? Contact the university library administrator.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

