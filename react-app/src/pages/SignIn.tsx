import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { login } from '../redux/loginApiCall';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {RootState} from '../redux/store';
import { Link } from 'react-router-dom';





interface UserState {
  isFetching: boolean;
  error: boolean;
}


export default function SignIn() {
  const [isSellerLogin, setIsSellerLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isFetching, error } = useSelector((state: { user: UserState }) => state.user);
  


const currentUser = useSelector((state: RootState) => state.user.currentUser);

  
  const navigate = useNavigate();
  
  const dispatch = useDispatch()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login( dispatch ,{ email , password})
      if(currentUser){
        navigate('/');
      }
    } catch (err: unknown) {
      
    }
  };
  


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <div className="mt-2 text-center">
          <div className="flex justify-center space-x-4">
            <button onClick={() => setIsSellerLogin(false)} className={`px-4 py-2 text-sm font-medium ${!isSellerLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>Customer</button>
            <button onClick={() => setIsSellerLogin(true)} className={`px-4 py-2 text-sm font-medium ${isSellerLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>Seller</button>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <p className="text-red-500 text-sm mb-4">Something went wrong! Please try again.</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your email" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your password" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isFetching}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isFetching ? 'Signing in...' : 'Sign in'} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/signup" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create new account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
