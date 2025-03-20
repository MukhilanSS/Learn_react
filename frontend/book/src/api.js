import axios from "axios";

const API_URL = "http://localhost:8080"; 

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const signupUser = async (userData) => {
  try {
    console.log("Signup Data:", userData); 
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log("Login Attempt:", credentials); 
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchBooks = async (page, size, search) => {
  const response = await fetch(`http://localhost:8080/books/paginated?page=${page}&size=${size}&search=${search || ""}`);
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json(); // Should return `{ content: [...], totalPages: X }`
};



export const fetchBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};


export const addBook = async (bookData) => {
  try {
    console.log("Adding Book:", bookData); 
    const response = await axiosInstance.post("/books/insert", bookData);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error.response?.data || error.message);
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  if (!id) {
    console.error("Update Error: Book ID is missing!");
    return;
  }
  try {
    console.log("Updating Book:", { id, ...bookData }); 
    const response = await axiosInstance.put(`/books/update/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};


export const deleteBook = async (id) => {
  try {
    console.log("Deleting Book ID:", id); 
    const response = await axiosInstance.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
