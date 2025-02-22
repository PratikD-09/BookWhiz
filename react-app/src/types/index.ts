export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage: string;
  genre: string;
  rating: number;
  publishedDate: string;
  pages?: number;
  language?: string;
  isbn?: string;
  publisher?: string;
  sellerId?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  profilePicture?: string;
  role: 'user' | 'seller';
  phone?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  shippingAddress: string;
}

export interface SellerProfile extends User {
  businessName: string;
  businessAddress: string;
  gstin?: string;
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
}