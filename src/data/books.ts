import { Book } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";

// const BASEURL = import.meta.env.VITE_REACT_APP_API_URL;

const books: Book[] = [
  {
    id: '1',
    title: 'Default Book 1',
    author: 'Author One',
    price: 20.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Default Book 2',
    author: 'Author Two',
    price: 15.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a default description for Book 2.',
    category: 'Non-Fiction',
    discount: 5
  },
];

// try {
//   const response = await axios.get(`${BASEURL}/books`);
//   books = response.data;
// } catch (error) {
//   toast.error("Failed to fetch books from the server");
//   console.error(error);
// }

export { books };


