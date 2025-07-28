import React from 'react';
import { ShoppingCart, Search, User, BookOpenCheck, Sparkles, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userRedux';

export default function Navbar() {
  const user = useSelector((state: { user: { currentUser: any } }) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <div className="relative">
              <BookOpenCheck className="h-8 w-8 text-indigo-600" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-800">BOOKWHIZ</span>
          </Link>
          
          <div className="flex-1 max-w-xl px-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search for books..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user.user?.username || 'User'}</span>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                  <User className="h-6 w-6" />
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin" className="text-sm text-gray-700 hover:text-gray-900">Sign In</Link>
                <Link to="/signup" className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Sign Up</Link>
              </div>
            )}
            <button className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}