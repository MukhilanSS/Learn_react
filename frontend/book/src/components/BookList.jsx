import { useState, useEffect } from "react";
import { fetchBooks, deleteBook } from "../api";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPaginatedBooks();
  }, [currentPage, itemsPerPage, searchTerm]);

  const fetchPaginatedBooks = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks(currentPage, itemsPerPage, searchTerm);
      setBooks(data.content);
      setTotalPages(data.totalPages); 
    } catch (error) {
      setError("Failed to fetch books. Please try again.");
      console.error("Fetch Books Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        fetchPaginatedBooks(); 
      } catch (error) {
        alert("Failed to delete the book. Please try again.");
        console.error("Delete Error:", error);
      }
    }
  };

  const handleUpdate = (book) => {
    navigate("/update", { state: { book } });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Book List</h2>
      
      {/* Search and Items Per Page */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search books..."
          className="border p-2 rounded-lg w-80"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
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
              {books.map((book) => (
                <tr key={book._id || book.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{book.bookName}</td>
                  <td className="p-3">{book.authorName}</td>
                  <td className="p-3">{book.publisher}</td>
                  <td className="p-3 text-right">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2" onClick={() => handleUpdate(book)}>Update</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(book._id || book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <button className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
            <button className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;
