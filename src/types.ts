type Author = {
  name : string;
}

type Category = {
  name : string;
}

export interface Book {
  id: string;
  title: string;
  author?: Author;
  price: number;
  image: string;
  description: string;
  category?: Category;
  discount: number;
  isbn?: string;
}

export interface CartItem extends Book {
  quantity: number;
}