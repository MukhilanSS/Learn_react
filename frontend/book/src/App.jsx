import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";
import UpdateBook from "./components/UpdateBook";
import Signup from "./components/SignUp";
import Login from "./components/Login";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<BookList />} />
        <Route path="/insert" element={<AddBookForm />} />
        <Route path="/update" element={<UpdateBook/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1 className="text-center p-6">Welcome to Book Management</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
