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

// Mock data for initial development
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 899,
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    genre: 'Classic',
    rating: 4.5,
    publishedDate: '1925-04-10',
  },
  // ... other mock books
];

function App() {
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
  interface User{
    user : string | null ;
  }

  const user = useSelector((state: { currentUser: User }) => state.currentUser);

  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> ?
        <Route path="/books/:id" element={<SingleBook/>}/>
         <Route path="/signin" element={user.user ? <Navigate to="/" /> : <SignIn />} />
         <Route path="/signup" element={user.user ? <Navigate to="/" /> : <SignUp />} />
         <Route path="/sellerDash" element={user.user ? <SellerDashboard /> : <Navigate to="/signin" />} />
         <Route path="/profile" element={user.user ? <UserProfile /> : <Navigate to="/signin" />} />

      </Routes>
      <Footer/>
    </Router>
  );
}
export default App;