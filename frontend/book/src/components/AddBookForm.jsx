import { useState } from "react";
import { addBook } from "../api";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
  const [book, setBook] = useState({
    bookName: "",
    authorName: "",
    authorMail: "",
    publisher: "",
    description: "",
    price: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook(book);
    alert("Book added successfully!");
    navigate("/books");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="bookName" placeholder="Book Name" onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="authorName" placeholder="Author Name" onChange={handleChange} className="w-full p-2 border" required />
        <input type="email" name="authorMail" placeholder="Author Email" onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="publisher" placeholder="Publisher" onChange={handleChange} className="w-full p-2 border" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border" required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
