import { Book } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";

// const BASEURL = import.meta.env.VITE_REACT_APP_API_URL;


const books: Book[] = [
  {
    id: '1',
    title: 'Ammapai man kaduwa dunna',
    author: 'Shashika Sandeep',
    price: 19.99,
    image: './assets/IMG-20241104-WA0021.jpg',
    description: 'This is a default description for Book 1.',
    category: 'Fantasy',
    discount: 5
  },
  {
    id: '2',
    title: 'Sankottan',
    author: 'Mahinda Prasad',
    price: 10.49,
    image: './assets/IMG-20241104-WA0022.jpg',
    description: 'This is a default description for Book 2.',
    category: 'Mystery',
    discount: 10
  },
  {
    id: '3',
    title: 'Panlo Coelho',
    author: 'The devil and miss prym',
    price: 12.29,
    image: './assets/IMG-20241104-WA0023.jpg',
    description: 'This is a default description for Book 3.',
    category: 'Thriller',
    discount: 2
  },
  {
    id: '4',
    title: 'May mara prasngaya',
    author: 'Mahinda Prasad',
    price: 11.99,
    image: './assets/IMG-20241104-WA0024.jpg',
    description: 'This is a default description for Book 4.',
    category: 'Science Fiction',
    discount: 8
  },
  {
    id: '5',
    title: 'Another Fiction',
    author: 'Mahinda Prasad',
    price: 15.75,
    image: './assets/IMG-20241104-WA0025.jpg',
    description: 'This is a default description for Book 5.',
    category: 'Romance',
    discount: 5
  },
  {
    id: '6',
    title: 'New Adventure',
    author: 'Mahinda Prasad',
    price: 9.99,
    image: './assets/IMG-20241104-WA0026.jpg',
    description: 'This is a default description for Book 6.',
    category: 'Adventure',
    discount: 10
  },
  {
    id: '7',
    title: 'Fantasy World',
    author: 'Mahinda Prasad',
    price: 14.20,
    image: './assets/IMG-20241104-WA0027.jpg',
    description: 'This is a default description for Book 7.',
    category: 'Fantasy',
    discount: 8
  },
  {
    id: '8',
    title: 'Mystery Night',
    author: 'Mahinda Prasad',
    price: 11.50,
    image: './assets/IMG-20241104-WA0028.jpg',
    description: 'This is a default description for Book 8.',
    category: 'Mystery',
    discount: 2
  },
  {
    id: '9',
    title: 'The Last Chapter',
    author: 'A.N. Author',
    price: 13.00,
    image: './assets/IMG-20241104-WA0029.jpg',
    description: 'This is a default description for Book 9.',
    category: 'Historical Fiction',
    discount: 5
  },
  {
    id: '10',
    title: 'Into the Unknown',
    author: 'J.K. Writer',
    price: 16.25,
    image: './assets/IMG-20241104-WA0030.jpg',
    description: 'This is a default description for Book 10.',
    category: 'Adventure',
    discount: 10
  },
  {
    id: '11',
    title: 'Tales of Mystery',
    author: 'C. Reader',
    price: 12.99,
    image: './assets/IMG-20241104-WA0031.jpg',
    description: 'This is a default description for Book 11.',
    category: 'Mystery',
    discount: 8
  },
  {
    id: '12',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    price: 14.99,
    image: './assets/IMG-20241104-WA0032.jpg',
    description: 'This is a default description for Book 12.',
    category: 'Self-Help',
    discount: 2
  },
  {
    id: '13',
    title: 'Creative Coding',
    author: 'J. Smith',
    price: 20.00,
    image: './assets/IMG-20241104-WA0033.jpg',
    description: 'This is a default description for Book 13.',
    category: 'Technology',
    discount: 5
  },
  {
    id: '14',
    title: 'Mastering React',
    author: 'D. Developer',
    price: 17.50,
    image: './assets/IMG-20241104-WA0034.jpg',
    description: 'This is a default description for Book 14.',
    category: 'Programming',
    discount: 10
  },
  {
    id: '15',
    title: 'Data Science from Scratch',
    author: 'Joel Grus',
    price: 25.00,
    image: './assets/IMG-20241104-WA0035.jpg',
    description: 'This is a default description for Book 15.',
    category: 'Data Science',
    discount: 8
  },
  {
    id: '16',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 14.50,
    image: './assets/IMG-20241104-WA0036.jpg',
    description: 'This is a default description for Book 16.',
    category: 'Classic',
    discount: 2
  },
  {
    id: '17',
    title: '1984',
    author: 'George Orwell',
    price: 13.75,
    image: './assets/IMG-20241104-WA0037.jpg',
    description: 'This is a default description for Book 17.',
    category: 'Dystopian',
    discount: 5
  },
  {
    id: '18',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    price: 15.00,
    image: './assets/IMG-20241104-WA0038.jpg',
    description: 'This is a default description for Book 18.',
    category: 'Dystopian',
    discount: 10
  },
  {
    id: '19',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 18.20,
    image: './assets/IMG-20241104-WA0039.jpg',
    description: 'This is a default description for Book 19.',
    category: 'Classic',
    discount: 8
  },
  {
    id: '20',
    title: 'Moby Dick',
    author: 'Herman Melville',
    price: 22.50,
    image: './assets/IMG-20241104-WA0040.jpg',
    description: 'This is a default description for Book 20.',
    category: 'Classic',
    discount: 2
  },
  {
    id: '21',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 21.75,
    image: './assets/IMG-20241104-WA0041.jpg',
    description: 'This is a default description for Book 21.',
    category: 'Adventure',
    discount: 5
  },
  {
    id: '22',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 15.99,
    image: './assets/IMG-20241104-WA0042.jpg',
    description: 'This is a default description for Book 22.',
    category: 'Romance',
    discount: 10
  },
  {
    id: '23',
    title: 'The Grapes of Wrath',
    author: 'John Steinbeck',
    price: 16.50,
    image: './assets/IMG-20241104-WA0043.jpg',
    description: 'This is a default description for Book 23.',
    category: 'Classic',
    discount: 2
  },
  {
    id: '24',
    title: 'The Road',
    author: 'Cormac McCarthy',
    price: 14.20,
    image: './assets/IMG-20241104-WA0044.jpg',
    description: 'This is a default description for Book 24.',
    category: 'Dystopian',
    discount: 8
  },
  {
    id: '25',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 12.99,
    image: './assets/IMG-20241104-WA0045.jpg',
    description: 'This is a default description for Book 25.',
    category: 'Fantasy',
    discount: 5
  },
  {
    id: '26',
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    price: 29.99,
    image: './assets/IMG-20241104-WA0046.jpg',
    description: 'This is a default description for Book 26.',
    category: 'Historical Fiction',
    discount: 10
  },
  {
    id: '27',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    price: 13.50,
    image: './assets/IMG-20241104-WA0047.jpg',
    description: 'This is a default description for Book 27.',
    category: 'Dystopian',
    discount: 2
  },
  {
    id: '28',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    price: 14.75,
    image: './assets/IMG-20241104-WA0048.jpg',
    description: 'This is a default description for Book 28.',
    category: 'Classic',
    discount: 8
  },
  {
    id: '29',
    title: 'The Fault in Our Stars',
    author: 'John Green',
    price: 11.95,
    image: './assets/IMG-20241104-WA0049.jpg',
    description: 'This is a default description for Book 29.',
    category: 'Young Adult',
    discount: 5
  },
  {
    id: '30',
    title: 'The Shining',
    author: 'Stephen King',
    price: 17.00,
    image: './assets/IMG-20241104-WA0050.jpg',
    description: 'This is a default description for Book 30.',
    category: 'Horror',
    discount: 10
  },
  {
    id: '31',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    price: 23.99,
    image: './assets/IMG-20241104-WA0051.jpg',
    description: 'This is a default description for Book 31.',
    category: 'Science',
    discount: 8
  },
  {
    id: '32',
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    price: 14.99,
    image: './assets/IMG-20241104-WA0052.jpg',
    description: 'This is a default description for Book 32.',
    category: 'Fantasy',
    discount: 2
  }
];


// try {
//   const response = await axios.get(`${BASEURL}/books`);
//   books = response.data;
// } catch (error) {
//   toast.error("Failed to fetch books from the server");
//   console.error(error);
// }

export { books };


