import React, { useState, useEffect, useCallback } from 'react';
import BookList from './BookList';
import ChangePasswordModal from './ChangePasswordModal';
import Toast from './Toast';
import { API_BASE } from '../config';

function StudentDashboard({ user, onLogout }) {
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
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

  const fetchBorrows = useCallback(async () => {
    if (!user.student || !user.student.id) return;
    try {
      const response = await fetch(`${API_BASE}/borrow/student/${user.student.id}`);
      const data = await response.json();
      setBorrows(data);
    } catch {
      showToast('Failed to load borrow history', 'error');
    }
  }, [user]);

  useEffect(() => {
    fetchBooks();
    fetchBorrows();
  }, [fetchBooks, fetchBorrows]);

  const handleBorrow = async (bookId) => {
    if (!user.student || !user.student.id) {
      showToast('Student profile not found. Please contact admin.', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/borrow/take?studentId=${user.student.id}&bookId=${bookId}`,
        { method: 'POST' }
      );
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error((err && err.message) || 'Failed to borrow book');
      }
      await fetchBooks();
      await fetchBorrows();
      showToast('Book borrowed successfully!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/borrow/return/${borrowId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error((err && err.message) || 'Failed to return book');
      }
      const returnedBorrow = await response.json();
      await fetchBooks();
      await fetchBorrows();
      if (returnedBorrow.fine > 0) {
        showToast(`Book returned! Fine of ₹${returnedBorrow.fine.toFixed(0)} charged. Please settle at the library desk.`, 'warning');
      } else {
        showToast('Book returned successfully on time!', 'success');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const activeBorrows = borrows.filter((b) => !b.returned);

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
              <p className="text-amber-200 text-xs font-medium">University Library — Student Portal</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-white font-bold text-sm">
                  {user.student?.name || user.username}
                  {user.student?.usn && (
                    <span className="ml-1.5 px-2 py-0.5 rounded-md bg-amber-900/80 text-amber-200 text-xs font-mono">
                      {user.student.usn}
                    </span>
                  )}
                </div>
                {user.student?.department && (
                  <div className="text-amber-200/90 text-xs">
                    {user.student.department} {user.student?.section ? `(Sec ${user.student.section})` : ''}
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowChangePassword(true)}
                className="bg-amber-700 hover:bg-amber-600 px-3 py-1.5 rounded-lg transition-colors text-sm border border-amber-500 font-medium"
              >
                🔐 Change Password
              </button>
              <button
                onClick={onLogout}
                className="bg-amber-600 hover:bg-amber-700 px-4 py-1.5 rounded-lg transition-colors text-sm font-semibold shadow-xs"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* My Borrowed Books Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-amber-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <span>📖</span> My Borrowed Books
            </h2>
            <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
              {activeBorrows.length} Active {activeBorrows.length === 1 ? 'Loan' : 'Loans'}
            </span>
          </div>

          {activeBorrows.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-amber-200/70 rounded-xl bg-amber-50/40">
              <span className="text-3xl">📚</span>
              <p className="text-sm font-semibold text-gray-700 mt-2">No books currently borrowed</p>
              <p className="text-xs text-gray-500 mt-0.5">Explore the library sections below and click "Borrow" on any available title.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-amber-50/80 border-b border-amber-200">
                  <tr>
                    {['Book Title', 'Borrow Date', 'Due Date', 'Status & Time Left', 'Estimated Fine', 'Action'].map((h) => (
                      <th key={h} className="px-4 py-3 text-xs font-bold text-amber-950 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeBorrows.map((borrow) => {
                    const borrowDateObj = borrow.borrowDate ? new Date(borrow.borrowDate) : new Date();
                    const dueDateObj = new Date(borrowDateObj.getTime() + 7 * 24 * 60 * 60 * 1000);
                    const now = new Date();
                    const daysHeld = Math.floor((now - borrowDateObj) / (1000 * 60 * 60 * 24));
                    const daysRemaining = 7 - daysHeld;
                    const isOverdue = daysHeld > 7;
                    const potentialFine = isOverdue ? (daysHeld - 7) * 10 : 0;

                    return (
                      <tr key={borrow.id} className="hover:bg-amber-50/50 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-gray-900 text-sm">
                          {borrow.book?.title || 'Unknown Title'}
                          <div className="text-xs text-gray-500 font-normal">{borrow.book?.author} • {borrow.book?.category || 'General'}</div>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-gray-600">
                          {borrowDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3.5 text-xs font-semibold text-gray-800">
                          {dueDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3.5 text-xs">
                          {isOverdue ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold bg-red-100 text-red-800">
                              ⚠️ Overdue by {daysHeld - 7} {daysHeld - 7 === 1 ? 'day' : 'days'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800">
                              ✓ {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-xs">
                          {potentialFine > 0 ? (
                            <span className="text-red-700 font-extrabold text-sm">₹{potentialFine} (₹10/day)</span>
                          ) : (
                            <span className="text-emerald-700 font-medium">₹0 (On Time)</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-xs">
                          <button
                            onClick={() => handleReturn(borrow.id)}
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50 text-xs"
                          >
                            Return Book
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <BookList
          books={books}
          userRole={user.role}
          onBorrow={handleBorrow}
          borrows={borrows}
          loading={loading}
        />
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

export default StudentDashboard;
