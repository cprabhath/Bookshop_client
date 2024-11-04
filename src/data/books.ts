import { Book } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";

// const BASEURL = import.meta.env.VITE_REACT_APP_API_URL;

function generateRandomPrice(min: number = 5, max: number = 100): number {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(2));
}

const randomPrice = generateRandomPrice();

const books: Book[] = [
  {
    id: '1',
    title: 'Ammapai man kaduwa dunna',
    author: 'Shashika Sandeep',
    price: randomPrice,
    image: './assets/IMG-20241104-WA0021.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 5
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0022.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '3',
    title: 'Panlo Coelho',
    author: 'The devil and miss prym',
    price: 12.99,
    image: './assets/IMG-20241104-WA0023.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 0
  },
  {
    id: '4',
    title: 'May mara prasngaya',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0024.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'May mara prasngaya',
    author: 'Mahinda Prasad',
    price: 11.99,
    image: './assets/IMG-20241104-WA0025.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0026.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0027.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0028.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0029.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0030.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0031.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0032.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0033.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0034.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0035.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0036.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0037.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0038.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0039.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0040.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0041.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0042.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0043.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0044.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0045.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0046.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0047.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0048.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0046.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0050.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0051.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.99,
    image: './assets/IMG-20241104-WA0052.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fiction',
    discount: 10
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


