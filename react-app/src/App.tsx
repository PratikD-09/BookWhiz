import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedBooks from './components/FeaturedBooks';
import BookDescription from './components/BookDescription';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import SellerDashboard from './pages/SellerDashboard';
import type { Book, CartItem } from './types';
import Home  from './pages/Home';
import SingleBook from './pages/SingleBook';
import { useSelector } from 'react-redux';
import {RootState} from './redux/store';
import { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { User } from 'lucide-react';





export interface User {
  _id: string;              // MongoDB document ID
  username: string;
  email: string;       // optional if excluded from JWT or frontend
  address?: string;
  isAdmin: boolean;
  phone?: string;
  createdAt?: string;       // from timestamps: true
  updatedAt?: string;
}


function App() {

  const token = localStorage.getItem("token"); // or wherever you're storing it

  let decodedUser =null;
  if(token){
    decodedUser = jwtDecode<User>(token);
  }


  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'seller' | null>(null);

  const handleAddToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.book.id === book.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { book, quantity: 1 }];
    });
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

const user = useSelector((state: RootState) => state.user.currentUser);


useEffect(() => {
  const fetchBooks = async()=>{
  try {
    let res = await axios.get("/api/books");
  } catch (error) {
    
  }
}
}, [])


  return (
   <Router>
  <Navbar />
  <Routes>
    {/* Redirect to SignIn if not logged in */}
    <Route path="/" element={user ? <Home /> : <Navigate to="/signin" replace />} />
    
    <Route path="/books/:id" element={<SingleBook />} />

    {/* Auth Routes */}
    <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
    <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />

    {/* Protected Routes */}
    <Route path="/sellerDash" element={ decodedUser?.isAdmin ? <SellerDashboard /> : <Navigate to="/signin" />} />
    <Route path="/userProfile" element={user ? <UserProfile /> : <Navigate to="/signin" />} />
  </Routes>
  <Footer />
</Router>
  );
}
export default App;