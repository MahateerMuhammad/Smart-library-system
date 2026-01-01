import { useState } from 'react';
import PropTypes from 'prop-types';

const BookForm = ({ onAddBook }) => {
    const [formData, setFormData] = useState({
        title: '',
        Author: '',
        ISBNnumber: '',
        publishedYear: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.title.trim() || !formData.Author.trim() || !formData.ISBNnumber.trim() || !formData.publishedYear) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        const year = parseInt(formData.publishedYear);
        if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
            setError('Please enter a valid year');
            setLoading(false);
            return;
        }

        try {
            await onAddBook({ ...formData, publishedYear: year });
            setFormData({
                title: '',
                Author: '',
                ISBNnumber: '',
                publishedYear: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-white">Add New Book</h2>

            {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">
                        Title <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        placeholder="Enter book title"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">
                        Author <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        name="Author"
                        value={formData.Author}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        placeholder="Enter author name"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">
                        ISBN Number <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        name="ISBNnumber"
                        value={formData.ISBNnumber}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        placeholder="Enter ISBN number"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">
                        Published Year <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="number"
                        name="publishedYear"
                        value={formData.publishedYear}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        placeholder="Enter published year"
                        min="1000"
                        max={new Date().getFullYear()}
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

BookForm.propTypes = {
    onAddBook: PropTypes.func.isRequired
};

export default BookForm;
