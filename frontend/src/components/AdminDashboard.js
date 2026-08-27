import React, { useState, useEffect, useCallback } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import UserRegistration from './UserRegistration';
import ChangePasswordModal from './ChangePasswordModal';
import Toast from './Toast';

const API_BASE = 'http://localhost:8080';

function AdminDashboard({ user, onLogout }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [activeTab, setActiveTab] = useState('books'); // 'books' | 'logs'
  const [stats, setStats] = useState(null);
  const [allBorrows, setAllBorrows] = useState([]);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => setToast({ message, type });

  const fetchBooks = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/books/all`);
      const data = await response.json();
      setBooks(data);
    } catch {
      showToast('Failed to fetch books', 'error');
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/books/stats`);
      const data = await response.json();
      setStats(data);
    } catch {
      // silently fail stats
    }
  }, []);

  const fetchAllBorrows = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/borrow/all`);
      const data = await response.json();
      setAllBorrows(data);
    } catch {
      showToast('Failed to fetch borrow logs', 'error');
    }
  }, []);

  useEffect(() => {
    fetchBooks();
    fetchStats();
  }, [fetchBooks, fetchStats]);

  useEffect(() => {
    if (activeTab === 'logs') {
      fetchAllBorrows();
    }
  }, [activeTab, fetchAllBorrows]);

  const handleAddBook = async (bookData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/books/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error((err && err.message) || 'Failed to add book');
      }
      await fetchBooks();
      await fetchStats();
      setShowAddForm(false);
      showToast('Book added successfully!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBook = async (id, bookData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/books/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error((err && err.message) || 'Failed to update book');
      }
      await fetchBooks();
      await fetchStats();
      setEditingBook(null);
      showToast('Book updated successfully!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/books/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error((err && err.message) || 'Failed to delete book');
      }
      await fetchBooks();
      await fetchStats();
      showToast('Book deleted successfully!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats
    ? [
        { label: 'Total Titles', value: stats.totalTitles, color: 'bg-amber-500', icon: '📚' },
        { label: 'Total Copies', value: stats.totalCopies, color: 'bg-blue-500', icon: '📋' },
        { label: 'Available', value: stats.availableCopies, color: 'bg-emerald-500', icon: '✅' },
        { label: 'Active Loans', value: stats.activeBorrows, color: 'bg-orange-500', icon: '🔖' },
        { label: 'Overdue', value: stats.overdueBorrows, color: 'bg-red-500', icon: '⏰' },
        { label: 'Fines Collected', value: `₹${stats.totalFinesCollected.toFixed(0)}`, color: 'bg-purple-500', icon: '💰' },
      ]
    : [];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-amber-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                <span>🏛️</span> UniLib
              </h1>
              <p className="text-amber-200 text-xs font-medium">University Library — Admin Portal</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">Welcome, {user.username}</span>
              <button
                onClick={() => setShowChangePassword(true)}
                className="bg-amber-700 hover:bg-amber-600 px-3 py-1.5 rounded-lg transition-colors text-sm border border-amber-500"
              >
                🔐 Change Password
              </button>
              <button
                onClick={onLogout}
                className="bg-amber-600 hover:bg-amber-700 px-4 py-1.5 rounded-lg transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {statCards.map((card) => (
              <div key={card.label} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
                <div className={`${card.color} text-white rounded-full w-10 h-10 flex items-center justify-center text-lg mb-2`}>
                  {card.icon}
                </div>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                <p className="text-xs text-gray-500 mt-1">{card.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6 border-b border-amber-200">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-5 py-2.5 font-semibold text-sm rounded-t-lg transition-colors ${
              activeTab === 'books'
                ? 'bg-amber-800 text-white'
                : 'text-amber-800 hover:bg-amber-100'
            }`}
          >
            📖 Books
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-5 py-2.5 font-semibold text-sm rounded-t-lg transition-colors ${
              activeTab === 'logs'
                ? 'bg-amber-800 text-white'
                : 'text-amber-800 hover:bg-amber-100'
            }`}
          >
            📋 Borrow Logs
          </button>
        </div>

        {/* Books Tab */}
        {activeTab === 'books' && (
          <>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => { setShowAddForm(true); setEditingBook(null); }}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow text-sm flex items-center gap-1.5"
              >
                <span>+</span> Add Book
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="bg-amber-800 hover:bg-amber-900 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow text-sm flex items-center gap-1.5"
              >
                <span>👤</span> Register User
              </button>
            </div>

            {showAddForm && (
              <div className="mb-6">
                <BookForm
                  onSubmit={handleAddBook}
                  onCancel={() => setShowAddForm(false)}
                  loading={loading}
                />
              </div>
            )}

            {editingBook && (
              <div className="mb-6">
                <BookForm
                  book={editingBook}
                  onSubmit={(data) => handleUpdateBook(editingBook.id, data)}
                  onCancel={() => setEditingBook(null)}
                  loading={loading}
                />
              </div>
            )}

            {showRegister && (
              <div className="mb-6">
                <UserRegistration
                  onSuccess={() => {
                    setShowRegister(false);
                    showToast('User registered successfully!', 'success');
                  }}
                  onCancel={() => setShowRegister(false)}
                />
              </div>
            )}

            <BookList
              books={books}
              onEdit={setEditingBook}
              onDelete={handleDeleteBook}
              userRole={user.role}
            />
          </>
        )}

        {/* Borrow Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">All Borrow History</h2>
              <p className="text-sm text-gray-500">{allBorrows.length} total records</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-amber-50">
                  <tr>
                    {['Student', 'Book', 'Borrow Date', 'Return Date', 'Status', 'Fine'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allBorrows.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-gray-400 py-10">No borrow records found</td>
                    </tr>
                  ) : (
                    allBorrows.map((b) => {
                      const days = b.borrowDate
                        ? Math.floor((new Date() - new Date(b.borrowDate)) / (1000 * 60 * 60 * 24))
                        : 0;
                      const isOverdue = !b.returned && days > 7;
                      return (
                        <tr key={b.id} className="hover:bg-amber-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-800">{b.student?.name || '—'}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{b.book?.title || '—'}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {b.borrowDate ? new Date(b.borrowDate).toLocaleDateString() : '—'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {b.returned && b.returnDate ? new Date(b.returnDate).toLocaleDateString() : '—'}
                          </td>
                          <td className="px-4 py-3">
                            {b.returned ? (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Returned</span>
                            ) : isOverdue ? (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Overdue ({days}d)</span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Active</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            {b.fine > 0 ? (
                              <span className="text-red-600">₹{b.fine.toFixed(0)}</span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <ChangePasswordModal
        username={user.username}
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        showToast={showToast}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </div>
  );
}

export default AdminDashboard;
