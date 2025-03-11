import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a className="text-xl font-bold">Book Management</a>
        <ul className="flex space-x-4">
          <li><Link to="/insert" className="hover:text-gray-400">Insert Book</Link></li>
          <li><Link to="/books" className="hover:text-gray-400">List Books</Link></li>
          <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
          <li><Link to="/signup" className="hover:text-gray-400">SignUp</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
