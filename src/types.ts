type Author = {
  name: string;
};

type Category = {
  name: string;
};

export interface Book {
  id: string;
  title: string;
  author: Author;
  price: number;
  image: string;
  description: string;
  category: Category;
  discount: number;
  isbn?: string;
  qty?: number;
}

export interface Customer {
  id: number;
  image: string;
  name: string;
  email: string;
  mobileNumber: string;
  address: string;
  createAt: string;
  carts?: CartItem[];
}

export interface CartItem extends Book {
  quantity: number;
}


export interface Order {
  orderId: string;
  id: string;
  date: string;
  total: number;
  status: string;
  trackingNumber: string;
  estimatedDelivery: string;
  items: CartItem[];
}