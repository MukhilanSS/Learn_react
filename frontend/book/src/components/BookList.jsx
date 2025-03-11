import { useState, useEffect } from "react";
import { fetchBooks, deleteBook } from "../api";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        setError("Failed to fetch books. Please try again.");
        console.error("Fetch Books Error:", error);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid book ID!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      } catch (error) {
        alert("Failed to delete the book. Please try again.");
        console.error("Delete Error:", error);
      }
    }
  };

  const handleView = (book) => {
    setSelectedBook(book);
  };

  const handleUpdate = (book) => {
    navigate("/update", { state: { book } });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Book List</h2>

      {loading && <p className="text-center text-gray-600">Loading books...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="text-center text-gray-600">No books available.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Book Name</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Publisher</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id || book.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{book.bookName}</td>
                <td className="p-3">{book.authorName}</td>
                <td className="p-3">{book.publisher}</td>
                <td className="p-3 text-right">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    onClick={() => handleView(book)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                    onClick={() => handleUpdate(book)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(book._id || book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedBook && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="bg-white p-6 rounded-lg w-96 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Book Details</h3>
            <p><strong>Book Name:</strong> {selectedBook.bookName}</p>
            <p><strong>Author:</strong> {selectedBook.authorName}</p>
            <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
            <p><strong>Description:</strong> {selectedBook.description || "No description available"}</p>
            <p><strong>Price:</strong> ${selectedBook.price || "N/A"}</p>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              onClick={() => setSelectedBook(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
