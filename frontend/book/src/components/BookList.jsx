import { useState, useEffect, useCallback } from "react";
import { fetchBooks, deleteBook } from "../api";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const booksPerPage = 5;
  const navigate = useNavigate();

  // Fetch books on mount
  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const data = await fetchBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        setError("Failed to fetch books. Please try again.");
        console.error("Fetch Books Error:", error);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  // Debounce function for search (delay API calls)
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Search books with debounce
  const searchBooks = useCallback(
    debounce((query) => {
      if (!query) {
        setFilteredBooks(books);
        return;
      }
      const results = books.filter((book) =>
        book.bookName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(results);
    }, 500), // 500ms delay
    [books]
  );

  useEffect(() => {
    searchBooks(searchTerm);
  }, [searchTerm, searchBooks]);

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid book ID!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        setFilteredBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== id)
        );
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

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Book List</h2>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search books..."
          className="border p-2 rounded-lg w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p className="text-center text-gray-600">Loading books...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="text-center text-gray-600">No books available.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <>
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
              {currentBooks.map((book) => (
                <tr
                  key={book._id || book.id}
                  className="border-b hover:bg-gray-100"
                >
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

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Book Details Modal */}
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
