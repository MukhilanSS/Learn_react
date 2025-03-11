import axios from "axios";
import React, { useRef } from "react";
const API_URL="http://localhost:8080/books";

export const getAllBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  };

export const addBook = async (bookData) => {
    return await axios.post(API_URL, bookData);
};

export const deleteBook = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};