export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  barcode: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum PaymentMethod {
  CASH = 'Cash',
  CARD = 'Card',
  CREDIT = 'Credit',
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  date: string; // Changed from Date to string for Supabase compatibility
  customerName?: string;
}

export enum UserRole {
  Admin = 'Admin',
  Cashier = 'Cashier',
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export enum View {
  POS = 'POS',
  PRODUCTS = 'Products',
  REPORTS = 'Reports',
  USERS = 'Users',
}