import { useState } from 'react';
import PropTypes from 'prop-types';

const BookCard = ({ book, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm(`Delete "${book.title}"?`)) {
            setIsDeleting(true);
            try {
                await onDelete(book._id);
            } catch (err) {
                console.error('Delete failed:', err);
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition">
            <div className="mb-3">
                <h3 className="text-lg font-semibold text-white mb-2">{book.title}</h3>
                <p className="text-gray-400 text-sm">by {book.Author}</p>
            </div>

            <div className="space-y-1.5 mb-4 text-sm">
                <p className="text-gray-400">
                    <span className="font-medium">ISBN:</span> <span className="text-gray-300 font-mono">{book.ISBNnumber}</span>
                </p>
                <p className="text-gray-400">
                    <span className="font-medium">Year:</span> <span className="text-gray-300">{book.publishedYear}</span>
                </p>
            </div>

            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    );
};

BookCard.propTypes = {
    book: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        Author: PropTypes.string.isRequired,
        ISBNnumber: PropTypes.string.isRequired,
        publishedYear: PropTypes.number.isRequired,
        createdAt: PropTypes.string
    }).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default BookCard;
