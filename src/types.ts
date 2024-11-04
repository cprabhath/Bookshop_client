export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
  category: string;
  discount: number;
}

export interface CartItem extends Book {
  quantity: number;
}