import React, { useState } from 'react';
import { API_BASE } from '../config';

function UserRegistration({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'STUDENT',
    name: '',
    usn: '',
    department: 'Computer Science & Engineering',
    section: 'A',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      username: formData.username.trim(),
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === 'STUDENT') {
      payload.student = {
        name: formData.name.trim() || formData.username.trim(),
        usn: formData.usn.trim(),
        department: formData.department.trim(),
        section: formData.section.trim().toUpperCase(),
      };
    }

    try {
      const response = await fetch(
        `${API_BASE}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error((errorData && errorData.message) || 'Registration failed');
      }

      await response.json();
      setFormData({
        username: '',
        password: '',
        role: 'STUDENT',
        name: '',
        usn: '',
        department: 'Computer Science & Engineering',
        section: 'A',
      });
      onSuccess('User account registered successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-amber-200/80 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
            <span>👤</span> Register New User
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Create an Admin or Student profile with academic details in the UniLib directory
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
            System Role *
          </label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-semibold bg-amber-50/50"
          >
            <option value="STUDENT">🎓 Student (Can borrow & return books)</option>
            <option value="ADMIN">👑 Admin (Full catalogue & user control)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
              Account Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="e.g. john21"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
              Password * (min. 4 characters)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              required
            />
          </div>
        </div>

        {/* Student Specific Fields */}
        {formData.role === 'STUDENT' && (
          <div className="pt-3 border-t border-amber-100/80 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <span>🎓</span> Student Academic Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  required={formData.role === 'STUDENT'}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  USN / Roll No *
                </label>
                <input
                  type="text"
                  value={formData.usn}
                  onChange={(e) =>
                    setFormData({ ...formData, usn: e.target.value })
                  }
                  placeholder="e.g. 1MS21CS045"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm uppercase"
                  required={formData.role === 'STUDENT'}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Department / Branch *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-medium"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Science & Engineering">Information Science & Engineering</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Electrical & Electronics">Electrical & Electronics</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
                  <option value="Mathematics & Basic Sciences">Mathematics & Basic Sciences</option>
                  <option value="Business Administration">Business Administration (MBA/BBA)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Class Section *
                </label>
                <select
                  value={formData.section}
                  onChange={(e) =>
                    setFormData({ ...formData, section: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-medium"
                >
                  {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                    <option key={letter} value={letter}>
                      Section {letter}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all disabled:opacity-50 text-sm"
          >
            {loading ? 'Registering...' : '✓ Create Account'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserRegistration;

