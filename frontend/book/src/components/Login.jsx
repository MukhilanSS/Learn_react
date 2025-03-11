import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(credentials);
      alert("Login successful!");
      navigate("/books"); 
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border my-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border my-2" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">Register</Link>
      </p>
    </div>
  );
};

export default Login;
