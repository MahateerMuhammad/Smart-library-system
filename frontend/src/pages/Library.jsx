import { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from '../components/BookForm';
import BookCard from '../components/BookCard';

const Library = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const API_URL = 'http://localhost:5000/api/books';

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(API_URL);
            setBooks(response.data);
        } catch (err) {
            setError('Failed to load books');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBook = async (bookData) => {
        try {
            const response = await axios.post(API_URL, bookData);
            setBooks(prev => [response.data, ...prev]);
            setSuccessMessage('Book added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            throw err;
        }
    };

    const handleDeleteBook = async (bookId) => {
        try {
            await axios.delete(`${API_URL}/${bookId}`);
            setBooks(prev => prev.filter(book => book._id !== bookId));
            setSuccessMessage('Book deleted!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to delete book');
            console.error('Error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                            Library Books Management System
                        </h1>
                        <div className="bg-gray-700 px-4 py-2 rounded-lg">
                            <p className="text-sm text-gray-300"><span className="font-semibold text-white">{books.length}</span> Books</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {successMessage && (
                    <div className="mb-6 bg-green-900/50 border border-green-700 text-green-300 p-4 rounded-lg">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="mb-6 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="text-red-300 hover:text-red-200">
                            ✕
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <BookForm onAddBook={handleAddBook} />
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h2 className="text-xl font-bold mb-6 text-white">All Books</h2>

                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="text-gray-400">Loading...</div>
                                </div>
                            ) : books.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-400 mb-2">No books in library</p>
                                    <p className="text-gray-500 text-sm">Add your first book using the form</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {books.map((book) => (
                                        <BookCard key={book._id} book={book} onDelete={handleDeleteBook} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Library;
