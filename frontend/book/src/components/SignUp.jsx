import { useState } from "react";
import { signupUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(user);
      alert("Signup successful! Please log in.");
      navigate("/login"); 
    } catch (error) {
      alert("Signup failed.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center">Signup</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border my-2" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border my-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border my-2" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Signup</button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
