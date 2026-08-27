import React, { useState, useEffect } from 'react';

const PRESET_CATEGORIES = [
  'Computer Science & IT',
  'Science & Nature',
  'Mathematics',
  'Literature & Fiction',
  'Self-Help & Psychology',
  'Business & Economics',
  'History & Philosophy',
  'Engineering & Technology',
  'Medical & Health Sciences',
  'Arts, Design & Music',
  'Geography & Social Sciences',
  'Children & Young Adult',
  'General & Reference',
];

function BookForm({ book, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Computer Science & IT',
    customCategory: '',
    totalCopies: '',
    availableCopies: '',
  });

  const [useCustomCategory, setUseCustomCategory] = useState(false);

  useEffect(() => {
    if (book) {
      const isPreset = PRESET_CATEGORIES.includes(book.category);
      setFormData({
        title: book.title || '',
        author: book.author || '',
        category: isPreset ? book.category : (book.category ? 'Other' : 'General & Reference'),
        customCategory: isPreset ? '' : (book.category || ''),
        totalCopies: book.totalCopies || '',
        availableCopies: book.availableCopies || '',
      });
      setUseCustomCategory(!isPreset && Boolean(book.category));
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = useCustomCategory
      ? (formData.customCategory.trim() || 'General & Reference')
      : (formData.category === 'Other' ? (formData.customCategory.trim() || 'General & Reference') : formData.category);

    onSubmit({
      title: formData.title,
      author: formData.author,
      category: finalCategory,
      totalCopies: parseInt(formData.totalCopies),
      availableCopies: book
        ? parseInt(formData.availableCopies)
        : parseInt(formData.totalCopies),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-amber-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {book ? '✏️ Edit Book' : '📚 Add New Book'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Clean Code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              placeholder="e.g. Robert C. Martin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              required
            />
          </div>
        </div>

        {/* Section / Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section / Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => {
                const val = e.target.value;
                setFormData({ ...formData, category: val });
                setUseCustomCategory(val === 'Other');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-white"
            >
              {PRESET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="Other">Other (Custom Section...)</option>
            </select>
          </div>

          {useCustomCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Section Name *
              </label>
              <input
                type="text"
                value={formData.customCategory}
                onChange={(e) =>
                  setFormData({ ...formData, customCategory: e.target.value })
                }
                placeholder="e.g. Robotics, Astronomy..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                required
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Copies *
            </label>
            <input
              type="number"
              min="1"
              value={formData.totalCopies}
              onChange={(e) =>
                setFormData({ ...formData, totalCopies: e.target.value })
              }
              placeholder="e.g. 5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              required
            />
          </div>

          {book && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Copies *
              </label>
              <input
                type="number"
                min="0"
                value={formData.availableCopies}
                onChange={(e) =>
                  setFormData({ ...formData, availableCopies: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                required
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 text-sm shadow"
          >
            {loading ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
