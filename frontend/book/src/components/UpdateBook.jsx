import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateBook } from "../api";

const UpdateBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {}; // Ensure state is available

  // Redirect if book data is missingo
  useEffect(() => {
    if (!book) {
      alert("Invalid book data. Redirecting...");
      navigate("/books");
    }
  }, [book, navigate]);

  const [formData, setFormData] = useState({
    bookName: book?.bookName || "",
    authorName: book?.authorName || "", // Read-only
    publisher: book?.publisher || "",
    description: book?.description || "",
    price: book?.price || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book?._id) {
      alert("Invalid book ID. Cannot update.");
      return;
    }

    try {
      await updateBook(book._id, formData);
      alert("Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update book. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Update Book</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Book Name</label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Author Name</label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Publisher</label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => navigate("/books")}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default UpdateBook;
