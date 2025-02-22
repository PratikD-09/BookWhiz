import React from 'react';
import { User, MapPin, Phone, Mail, Package, Edit } from 'lucide-react';

// Mock data for development
const mockUser = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  address: '123, Park Street, Mumbai, Maharashtra - 400001',
  profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const mockOrders = [
  {
    id: 'ORD001',
    date: '2024-03-10',
    status: 'delivered',
    items: [
      {
        book: {
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          price: 899,
          coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        },
        quantity: 1,
      },
    ],
    totalAmount: 899,
  },
  // Add more mock orders as needed
];

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={mockUser.profilePicture}
                    alt={mockUser.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{mockUser.name}</h2>
                <p className="text-gray-500">Customer</p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>{mockUser.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{mockUser.address}</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Order History</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {mockOrders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Order #{order.id}</span>
                        <span className="ml-4 text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                        {order.status}
                      </span>
                    </div>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img
                          src={item.book.coverImage}
                          alt={item.book.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.book.title}</h4>
                          <p className="text-sm text-gray-500">{item.book.author}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ₹{item.book.price}
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Amount</span>
                      <span className="text-lg font-medium text-gray-900">₹{order.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}