import React, { useState } from 'react';
import { API_BASE } from '../config';

function UserRegistration({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    role: 'STUDENT',
    name: '',
    usn: '',
    cardNumber: '',
    department: 'Computer Science & Engineering',
    section: 'A',
    adminUsername: '',
    adminPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let payload;
    if (formData.role === 'STUDENT') {
      const trimmedUsn = formData.usn.trim().toUpperCase();
      const trimmedCard = formData.cardNumber.trim();

      if (!trimmedUsn) {
        setError('USN is required for student registration');
        setLoading(false);
        return;
      }
      if (!trimmedCard || trimmedCard.length < 4) {
        setError('Library Card Number must be at least 4 characters');
        setLoading(false);
        return;
      }

      payload = {
        username: trimmedUsn, // USN is the Login Username!
        password: trimmedCard, // Library Card No is the Login Password!
        role: 'STUDENT',
        student: {
          name: formData.name.trim() || trimmedUsn,
          usn: trimmedUsn,
          cardNumber: trimmedCard,
          department: formData.department.trim(),
          section: formData.section.trim().toUpperCase(),
        },
      };
    } else {
      payload = {
        username: formData.adminUsername.trim(),
        password: formData.adminPassword,
        role: 'ADMIN',
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
        role: 'STUDENT',
        name: '',
        usn: '',
        cardNumber: '',
        department: 'Computer Science & Engineering',
        section: 'A',
        adminUsername: '',
        adminPassword: '',
      });
      onSuccess(
        formData.role === 'STUDENT'
          ? `Student registered successfully! (Username: ${payload.username}, Password: ${payload.password})`
          : 'Admin account created successfully!'
      );
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
            Create an Admin or Student profile. Students log in with their USN & Library Card Number.
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
            <option value="STUDENT">🎓 Student (Login with USN + Library Card No)</option>
            <option value="ADMIN">👑 Admin (Full catalogue & user control)</option>
          </select>
        </div>

        {/* Student Specific Fields */}
        {formData.role === 'STUDENT' ? (
          <div className="space-y-4 pt-1">
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
              <span className="text-base">💡</span>
              <div>
                <strong className="font-bold">Automatic Credentials:</strong> The student's <strong>USN</strong> will be their Login Username and their <strong>Library Card Number</strong> will be their Login Password.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Keerthi V"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  USN / Roll No * (Username)
                </label>
                <input
                  type="text"
                  value={formData.usn}
                  onChange={(e) =>
                    setFormData({ ...formData, usn: e.target.value })
                  }
                  placeholder="e.g. 1BM24CS387"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm uppercase font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Library Card Number * (Password)
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  placeholder="e.g. LIB-94820 (min. 4 chars)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-mono font-bold"
                  required
                />
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

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Department / Academic Branch *
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
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Admin Username *
              </label>
              <input
                type="text"
                value={formData.adminUsername}
                onChange={(e) =>
                  setFormData({ ...formData, adminUsername: e.target.value })
                }
                placeholder="e.g. librarian_admin"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Admin Password * (min. 4 characters)
              </label>
              <input
                type="password"
                value={formData.adminPassword}
                onChange={(e) =>
                  setFormData({ ...formData, adminPassword: e.target.value })
                }
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                required
              />
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

