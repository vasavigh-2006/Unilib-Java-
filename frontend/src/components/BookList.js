import React, { useState } from 'react';

const CATEGORY_META = {
  'Computer Science & IT': {
    icon: '💻',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    headerBg: 'bg-blue-600 text-white',
    cardBg: 'hover:border-blue-400 border-blue-100 bg-gradient-to-br from-blue-50/50 to-white',
    badge: 'bg-blue-100 text-blue-800',
    description: 'Programming, Algorithms, Data Structures, AI, Web & DevOps',
  },
  'Science & Nature': {
    icon: '🔬',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    headerBg: 'bg-emerald-600 text-white',
    cardBg: 'hover:border-emerald-400 border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white',
    badge: 'bg-emerald-100 text-emerald-800',
    description: 'Physics, Chemistry, Astronomy, Biology & Genetics',
  },
  'Mathematics': {
    icon: '📐',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    headerBg: 'bg-purple-600 text-white',
    cardBg: 'hover:border-purple-400 border-purple-100 bg-gradient-to-br from-purple-50/50 to-white',
    badge: 'bg-purple-100 text-purple-800',
    description: 'Calculus, Linear Algebra, Probability, Statistics & Logic',
  },
  'Literature & Fiction': {
    icon: '📚',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    headerBg: 'bg-amber-700 text-white',
    cardBg: 'hover:border-amber-400 border-amber-100 bg-gradient-to-br from-amber-50/50 to-white',
    badge: 'bg-amber-100 text-amber-800',
    description: 'Novels, Classics, Sci-Fi, Fantasy & Modern Fiction',
  },
  'Self-Help & Psychology': {
    icon: '🧠',
    color: 'bg-rose-100 text-rose-800 border-rose-200',
    headerBg: 'bg-rose-600 text-white',
    cardBg: 'hover:border-rose-400 border-rose-100 bg-gradient-to-br from-rose-50/50 to-white',
    badge: 'bg-rose-100 text-rose-800',
    description: 'Habit Building, Productivity, Mindset & Psychology',
  },
  'Business & Economics': {
    icon: '💼',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    headerBg: 'bg-indigo-600 text-white',
    cardBg: 'hover:border-indigo-400 border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white',
    badge: 'bg-indigo-100 text-indigo-800',
    description: 'Startups, Investing, Management, Finance & Strategy',
  },
  'History & Philosophy': {
    icon: '🏛️',
    color: 'bg-teal-100 text-teal-800 border-teal-200',
    headerBg: 'bg-teal-700 text-white',
    cardBg: 'hover:border-teal-400 border-teal-100 bg-gradient-to-br from-teal-50/50 to-white',
    badge: 'bg-teal-100 text-teal-800',
    description: 'World History, Human Evolution, Ancient & Modern Philosophy',
  },
  'Engineering & Technology': {
    icon: '⚙️',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    headerBg: 'bg-cyan-700 text-white',
    cardBg: 'hover:border-cyan-400 border-cyan-100 bg-gradient-to-br from-cyan-50/50 to-white',
    badge: 'bg-cyan-100 text-cyan-800',
    description: 'Mechanical, Electrical, Civil & Emerging Technologies',
  },
  'Medical & Health Sciences': {
    icon: '🏥',
    color: 'bg-red-100 text-red-800 border-red-200',
    headerBg: 'bg-red-600 text-white',
    cardBg: 'hover:border-red-400 border-red-100 bg-gradient-to-br from-red-50/50 to-white',
    badge: 'bg-red-100 text-red-800',
    description: 'Anatomy, Medicine, Nursing & Healthcare',
  },
  'Arts, Design & Music': {
    icon: '🎨',
    color: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    headerBg: 'bg-fuchsia-600 text-white',
    cardBg: 'hover:border-fuchsia-400 border-fuchsia-100 bg-gradient-to-br from-fuchsia-50/50 to-white',
    badge: 'bg-fuchsia-100 text-fuchsia-800',
    description: 'Visual Arts, Graphic Design, Architecture & Music Theory',
  },
  'Geography & Social Sciences': {
    icon: '🌍',
    color: 'bg-green-100 text-green-800 border-green-200',
    headerBg: 'bg-green-700 text-white',
    cardBg: 'hover:border-green-400 border-green-100 bg-gradient-to-br from-green-50/50 to-white',
    badge: 'bg-green-100 text-green-800',
    description: 'World Geography, Cultures, Sociology & Political Science',
  },
  'Children & Young Adult': {
    icon: '👶',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    headerBg: 'bg-yellow-600 text-white',
    cardBg: 'hover:border-yellow-400 border-yellow-100 bg-gradient-to-br from-yellow-50/50 to-white',
    badge: 'bg-yellow-100 text-yellow-800',
    description: 'Young Readers, Fairy Tales, Educational Stories & Fantasy',
  },
  'General & Reference': {
    icon: '📖',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    headerBg: 'bg-gray-700 text-white',
    cardBg: 'hover:border-gray-400 border-gray-100 bg-gradient-to-br from-gray-50/50 to-white',
    badge: 'bg-gray-100 text-gray-800',
    description: 'General Reading, Dictionaries, Encyclopedias & Misc',
  },
  'General': {
    icon: '📖',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    headerBg: 'bg-gray-700 text-white',
    cardBg: 'hover:border-gray-400 border-gray-100 bg-gradient-to-br from-gray-50/50 to-white',
    badge: 'bg-gray-100 text-gray-800',
    description: 'General Reading & Miscellaneous Titles',
  },
};

const getCategoryMeta = (cat) => {
  return (
    CATEGORY_META[cat] || {
      icon: '📁',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      headerBg: 'bg-amber-800 text-white',
      cardBg: 'hover:border-amber-400 border-amber-100 bg-white',
      badge: 'bg-amber-100 text-amber-800',
      description: 'Collection of books in this section',
    }
  );
};

function BookList({ books, onEdit, onDelete, userRole, onBorrow, borrows = [], loading }) {
  const isAdmin = userRole === 'ADMIN';
  const isStudent = userRole === 'STUDENT';

  const [activeSection, setActiveSection] = useState('ALL'); // 'ALL' | specific category name (e.g. 'Mathematics')
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'available' | 'outofstock'

  // Calculate stats per category
  const categoryStats = books.reduce((acc, book) => {
    const cat = book.category || 'General';
    if (!acc[cat]) {
      acc[cat] = { count: 0, available: 0, books: [] };
    }
    acc[cat].count += 1;
    acc[cat].available += book.availableCopies;
    acc[cat].books.push(book);
    return acc;
  }, {});

  const presentCategories = Object.keys(categoryStats).sort();

  const isBorrowed = (bookId) => {
    return borrows.some((b) => b.book?.id === bookId && !b.returned);
  };

  // Filter books according to active section, search keyword, and stock status
  const displayedBooks = books.filter((book) => {
    const bookCategory = book.category || 'General';

    // Section filter
    const matchSection =
      activeSection === 'ALL' ||
      bookCategory.toLowerCase() === activeSection.toLowerCase();

    // Search query filter
    const matchSearch =
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.toLowerCase().includes(search.toLowerCase()) ||
      bookCategory.toLowerCase().includes(search.toLowerCase());

    // Stock availability filter
    const matchStock =
      stockFilter === 'all' ||
      (stockFilter === 'available' && book.availableCopies > 0) ||
      (stockFilter === 'outofstock' && book.availableCopies === 0);

    return matchSection && matchSearch && matchStock;
  });

  const activeMeta = activeSection !== 'ALL' ? getCategoryMeta(activeSection) : null;

  return (
    <div className="space-y-6">
      {/* Top Section Navigation Bar / Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-amber-200/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Library Sections
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Select any section below to explore only books belonging to that category
            </p>
          </div>

          {/* Search & Stock Filter Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <input
                type="text"
                placeholder={
                  activeSection === 'ALL'
                    ? '🔍 Search all sections...'
                    : `🔍 Search in ${activeSection}...`
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 pl-9 text-sm border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 w-64 bg-white shadow-2xs"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
            </div>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3.5 py-2 text-sm border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium text-gray-700 shadow-2xs"
            >
              <option value="all">All Copies</option>
              <option value="available">Available in Stock</option>
              <option value="outofstock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Interactive Section Tabs (Click to switch directly to any section) */}
        <div className="mt-5 pt-4 border-t border-amber-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setActiveSection('ALL')}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              activeSection === 'ALL'
                ? 'bg-amber-800 text-white ring-2 ring-amber-800/30'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <span>📂 All Sections</span>
            <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
              activeSection === 'ALL' ? 'bg-white/20 text-white' : 'bg-amber-200 text-amber-950'
            }`}>
              {books.length}
            </span>
          </button>

          {presentCategories.map((cat) => {
            const meta = getCategoryMeta(cat);
            const stats = categoryStats[cat];
            const isSelected = activeSection.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setActiveSection(cat)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  isSelected
                    ? 'bg-amber-800 text-white ring-2 ring-amber-800/30 scale-102'
                    : 'bg-white text-gray-800 hover:bg-amber-50 border border-gray-200 hover:border-amber-300'
                }`}
              >
                <span>{meta.icon}</span>
                <span>{cat}</span>
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-amber-100 text-amber-900'
                }`}>
                  {stats?.count || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION CARDS OVERVIEW (Displayed when ALL is selected and no filters active) */}
      {activeSection === 'ALL' && !search && stockFilter === 'all' && (
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <span>🗂️</span> Browse by Department / Section
            </h3>
            <span className="text-xs font-medium text-gray-500">
              Click any section to see its exclusive books
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {presentCategories.map((cat) => {
              const meta = getCategoryMeta(cat);
              const stats = categoryStats[cat];
              return (
                <div
                  key={cat}
                  onClick={() => setActiveSection(cat)}
                  className={`cursor-pointer rounded-2xl p-5 border shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${meta.cardBg} flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl p-2 rounded-xl bg-white shadow-xs border border-gray-100">
                        {meta.icon}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        {stats?.count || 0} Titles
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-gray-900 mb-1 leading-snug">
                      {cat}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                      {meta.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-bold">
                      {stats?.available || 0} Available Copies
                    </span>
                    <span className="text-amber-800 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Open Section ➔
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SINGLE SECTION HEADER (Displayed when a specific section is clicked) */}
      {activeSection !== 'ALL' && (
        <div className="bg-white rounded-2xl p-5 shadow-md border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveSection('ALL')}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>⬅</span> All Sections
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeMeta?.icon}</span>
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  {activeSection} Section
                </h3>
                <p className="text-xs text-gray-500">
                  Showing books exclusively in this section
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              {displayedBooks.length} {displayedBooks.length === 1 ? 'Book' : 'Books'} in this section
            </span>
          </div>
        </div>
      )}

      {/* BOOKS TABLE (Exclusively for current section or filtered list) */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-amber-200/80">
        <div className="px-6 py-4 bg-amber-50/80 border-b border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>📖</span>
            {activeSection === 'ALL'
              ? `All Catalog Books (${displayedBooks.length})`
              : `Books in ${activeSection} (${displayedBooks.length})`}
          </h3>

          {(search || stockFilter !== 'all') && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Filters active</span>
              <button
                onClick={() => {
                  setSearch('');
                  setStockFilter('all');
                }}
                className="text-xs text-amber-700 hover:text-amber-900 font-bold underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Author
                </th>
                {activeSection === 'ALL' && (
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Section
                  </th>
                )}
                <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                {isAdmin && (
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                )}
                {isStudent && (
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedBooks.length === 0 ? (
                <tr>
                  <td
                    colSpan={isAdmin || isStudent ? (activeSection === 'ALL' ? 6 : 5) : (activeSection === 'ALL' ? 5 : 4)}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    <p className="text-3xl mb-2">📭</p>
                    <p className="text-base font-bold text-gray-700 mb-1">
                      No books found in this section
                    </p>
                    <p className="text-xs text-gray-400">
                      {search ? 'Try modifying your search keywords' : 'Add books to this section using "+ Add Book"'}
                    </p>
                  </td>
                </tr>
              ) : (
                displayedBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                      {book.title}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {book.author}
                    </td>
                    {activeSection === 'ALL' && (
                      <td className="px-5 py-4 text-sm">
                        <button
                          onClick={() => setActiveSection(book.category || 'General')}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all hover:scale-105 ${getCategoryMeta(
                            book.category || 'General'
                          ).badge}`}
                          title="Click to view all books in this section"
                        >
                          {getCategoryMeta(book.category || 'General').icon}{' '}
                          {book.category || 'General'}
                        </button>
                      </td>
                    )}
                    <td className="px-5 py-4 text-sm font-bold">
                      <span className={book.availableCopies > 0 ? 'text-emerald-700' : 'text-rose-600'}>
                        {book.availableCopies}
                      </span>{' '}
                      <span className="text-gray-400 font-normal">/ {book.totalCopies}</span>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                          book.availableCopies > 0
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {book.availableCopies > 0 ? '✓ Available' : '✕ Out of Stock'}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-5 py-4 text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => onEdit(book)}
                          className="text-blue-600 hover:text-blue-900 mr-4 font-bold hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(book.id)}
                          className="text-red-600 hover:text-red-900 font-bold hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                    {isStudent && (
                      <td className="px-5 py-4 text-sm font-medium whitespace-nowrap">
                        {isBorrowed(book.id) ? (
                          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            Already Borrowed
                          </span>
                        ) : book.availableCopies > 0 ? (
                          <button
                            onClick={() => onBorrow(book.id)}
                            disabled={loading}
                            className="bg-amber-600 text-white px-4 py-1.5 rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50 text-xs font-bold shadow-xs"
                          >
                            Borrow
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                            Unavailable
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookList;
