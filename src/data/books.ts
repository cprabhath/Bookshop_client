import AxiosInstance from '../lib/AxiosInstence';
import { Book } from "../types";

const books : Book[] = [
  {
    id: '21',
    title: 'The Girl with the Dragon Tattoo',
    author: {
      name: 'Stieg Larsson'
    },
    price: 15.99,
    image: './assets/IMG-20241104-WA0021.jpg',
    description: 'This is a default description for Book 21.',
    category: {
      name: 'Mystery'
    },
    discount: 10
  },
  {
    id: '22',
    title: 'Gone Girl',
    author: {
      name: 'Gillian Flynn'
    },
    price: 14.25,
    image: './assets/IMG-20241104-WA0022.jpg',
    description: 'This is a default description for Book 22.',
    category: {
      name: 'Thriller'
    },
    discount: 8
  },
  {
    id: '23',
    title: 'The Alchemist',
    author: {
      name: 'Paulo Coelho'
    },
    price: 12.99,
    image: './assets/IMG-20241104-WA0023.jpg',
    description: 'This is a default description for Book 23.',
    category: {
      name: 'Fantasy'
    },
    discount: 5
  },
  {
    id: '24',
    title: 'Life of Pi',
    author: {
      name: 'Yann Martel'
    },
    price: 16.00,
    image: './assets/IMG-20241104-WA0024.jpg',
    description: 'This is a default description for Book 24.',
    category: {
      name: 'Adventure'
    },
    discount: 10
  },
  {
    id: '25',
    title: 'The Road',
    author: {
      name: 'Cormac McCarthy'
    },
    price: 14.00,
    image: './assets/IMG-20241104-WA0025.jpg',
    description: 'This is a default description for Book 25.',
    category: {
      name: 'Fiction'
    },
    discount: 2
  },
  {
    id: '26',
    title: 'The Kite Runner',
    author: {
      name: 'Khaled Hosseini'
    },
    price: 15.50,
    image: './assets/IMG-20241104-WA0026.jpg',
    description: 'This is a default description for Book 26.',
    category: {
      name: 'Historical Fiction'
    },
    discount: 5
  },
  {
    id: '27',
    title: 'Little Fires Everywhere',
    author: {
      name: 'Celeste Ng'
    },
    price: 19.99,
    image: './assets/IMG-20241104-WA0027.jpg',
    description: 'This is a default description for Book 27.',
    category: {
      name: 'Fiction'
    },
    discount: 8
  },
  {
    id: '28',
    title: 'Where the Crawdads Sing',
    author: {
      name: 'Delia Owens'
    },
    price: 22.00,
    image: './assets/IMG-20241104-WA0028.jpg',
    description: 'This is a default description for Book 28.',
    category: {
      name: 'Mystery'
    },
    discount: 2
  },
  {
    id: '29',
    title: 'The Fault in Our Stars',
    author: {
      name: 'John Green'
    },
    price: 11.95,
    image: './assets/IMG-20241104-WA0029.jpg',
    description: 'This is a default description for Book 29.',
    category: {
      name: 'Young Adult'
    },
    discount: 5
  },
  {
    id: '30',
    title: 'The Hunger Games',
    author: {
      name: 'Suzanne Collins'
    },
    price: 12.50,
    image: './assets/IMG-20241104-WA0030.jpg',
    description: 'This is a default description for Book 30.',
    category: {
      name: 'Dystopian'
    },
    discount: 10
  },
  {
    id: '31',
    title: 'The Lovely Bones',
    author: {
      name: 'Alice Sebold'
    },
    price: 14.99,
    image: './assets/IMG-20241104-WA0031.jpg',
    description: 'This is a default description for Book 31.',
    category: {
      name: 'Fiction'
    },
    discount: 8
  },
  {
    id: '32',
    title: 'The Night Circus',
    author: {
      name: 'Erin Morgenstern'
    },
    price: 20.00,
    image: './assets/IMG-20241104-WA0032.jpg',
    description: 'This is a default description for Book 32.',
    category: {
      name: 'Fantasy'
    },
    discount: 5
  },
  {
    id: '33',
    title: 'The Book Thief',
    author: {
      name: 'Markus Zusak'
    },
    price: 18.75,
    image: './assets/IMG-20241104-WA0033.jpg',
    description: 'This is a default description for Book 33.',
    category: {
      name: 'Historical Fiction'
    },
    discount: 10
  },
  {
    id: '34',
    title: 'Station Eleven',
    author: {
      name: 'Emily St. John Mandel'
    },
    price: 16.00,
    image: './assets/IMG-20241104-WA0034.jpg',
    description: 'This is a default description for Book 34.',
    category: {
      name: 'Science Fiction'
    },
    discount: 2
  },
  {
    id: '35',
    title: 'The Immortal Life of Henrietta Lacks',
    author: {
      name: 'Rebecca Skloot'
    },
    price: 13.00,
    image: './assets/IMG-20241104-WA0035.jpg',
    description: 'This is a default description for Book 35.',
    category: {
      name: 'Non-Fiction'
    },
    discount: 5
  },
  {
    id: '36',
    title: 'The Glass Castle',
    author: {
      name: 'Jeannette Walls'
    },
    price: 12.99,
    image: './assets/IMG-20241104-WA0036.jpg',
    description: 'This is a default description for Book 36.',
    category: {
      name: 'Memoir'
    },
    discount: 8
  },
  {
    id: '37',
    title: 'A Man Called Ove',
    author: {
      name: 'Fredrik Backman'
    },
    price: 16.50,
    image: './assets/IMG-20241104-WA0037.jpg',
    description: 'This is a default description for Book 37.',
    category: {
      name: 'Fiction'
    },
    discount: 2
  },
  {
    id: '38',
    title: 'Before We Were Strangers',
    author: {
      name: 'Renée Carlino'
    },
    price: 14.50,
    image: './assets/IMG-20241104-WA0038.jpg',
    description: 'This is a default description for Book 38.',
    category: {
      name: 'Romance'
    },
    discount: 5
  },
  {
    id: '39',
    title: 'The Silent Patient',
    author: {
      name: 'Alex Michaelides'
    },
    price: 15.75,
    image: './assets/IMG-20241104-WA0039.jpg',
    description: 'This is a default description for Book 39.',
    category: {
      name: 'Thriller'
    },
    discount: 10
  },
  {
    id: '40',
    title: 'Normal People',
    author: {
      name: 'Sally Rooney'
    },
    price: 18.00,
    image: './assets/IMG-20241104-WA0040.jpg',
    description: 'This is a default description for Book 40.',
    category: {
      name: 'Fiction'
    },
    discount: 8
  },
  {
    id: '41',
    title: 'Daisy Jones & The Six',
    author: {
      name: 'Taylor Jenkins Reid'
    },
    price: 17.50,
    image: './assets/IMG-20241104-WA0041.jpg',
    description: 'This is a default description for Book 41.',
    category: {
      name: 'Fiction'
    },
    discount: 5
  },
  {
    id: '42',
    title: 'The Vanishing Half',
    author: {
      name: 'Brit Bennett'
    },
    price: 21.00,
    image: './assets/IMG-20241104-WA0042.jpg',
    description: 'This is a default description for Book 42.',
    category: {
      name: 'Literary Fiction'
    },
    discount: 2
  },
  {
    id: '43',
    title: 'Circe',
    author: {
      name: 'Madeline Miller'
    },
    price: 18.25,
    image: './assets/IMG-20241104-WA0043.jpg',
    description: 'This is a default description for Book 43.',
    category: {
      name: 'Fantasy'
    },
    discount: 10
  },
  {
    id: '44',
    title: 'The Guest List',
    author: {
      name: 'Lucy Foley'
    },
    price: 20.50,
    image: './assets/IMG-20241104-WA0044.jpg',
    description: 'This is a default description for Book 44.',
    category: {
      name: 'Thriller'
    },
    discount: 5
  },
  {
    id: '45',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: {
      name: 'Taylor Jenkins Reid'
    },
    price: 16.50,
    image: './assets/IMG-20241104-WA0045.jpg',
    description: 'This is a default description for Book 45.',
    category: {
      name: 'Historical Fiction'
    },
    discount: 2
  },
  {
    id: '46',
    title: 'Anxious People',
    author: {
      name: 'Fredrik Backman'
    },
    price: 18.75,
    image: './assets/IMG-20241104-WA0046.jpg',
    description: 'This is a default description for Book 46.',
    category: {
      name: 'Fiction'
    },
    discount: 5
  },
  {
    id: '47',
    title: 'The Midnight Library',
    author: {
      name: 'Matt Haig'
    },
    price: 19.00,
    image: './assets/IMG-20241104-WA0047.jpg',
    description: 'This is a default description for Book 47.',
    category: {
      name: 'Fantasy'
    },
    discount: 10
  },
  {
    id: '48',
    title: 'The Invisible Life of Addie LaRue',
    author: {
      name: 'V.E. Schwab'
    },
    price: 17.99,
    image: './assets/IMG-20241104-WA0048.jpg',
    description: 'This is a default description for Book 48.',
    category: {
      name: 'Fantasy'
    },
    discount: 2
  },
  {
    id: '49',
    title: 'Project Hail Mary',
    author: {
      name: 'Andy Weir'
    },
    price: 19.99,
    image: './assets/IMG-20241104-WA0049.jpg',
    description: 'This is a default description for Book 49.',
    category: {
      name: 'Science Fiction'
    },
    discount: 5
  },
  {
    id: '50',
    title: 'Malibu Rising',
    author: {
      name: 'Taylor Jenkins Reid'
    },
    price: 20.00,
    image: './assets/IMG-20241104-WA0050.jpg',
    description: 'This is a default description for Book 50.',
    category: {
      name: 'Fiction'
    },
    discount: 10
  },
  {
    id: '51',
    title: 'Homegoing',
    author: {
      name: 'Yaa Gyasi'
    },
    price: 15.99,
    image: './assets/IMG-20241104-WA0051.jpg',
    description: 'This is a default description for Book 51.',
    category: {
      name: 'Historical Fiction'
    },
    discount: 2
  },
  {
    id: '52',
    title: 'The Overstory',
    author: {
      name: 'Richard Powers'
    },
    price: 22.50,
    image: './assets/IMG-20241104-WA0052.jpg',
    description: 'This is a default description for Book 52.',
    category: {
      name: 'Literary Fiction'
    },
    discount: 5
  }
];


try {
  const response = await AxiosInstance.get("/Book");
  
  // Map response data to the Book type structure
  const mappedBooks = response.data.$values.map((item: Book) => ({
    id: item.id.toString(),
    title: item.title,
    author: item.author?.name || "Unknown",
    price: item.price,
    image: item.image,
    description: item.description,
    category: item.category?.name || "Unknown",
    discount: item.discount
  }));

  // Add mapped books to the books array
  books.push(...mappedBooks);
  
} catch (error) {
  alert("Error fetching books");
  console.error(error);
}

export { books };
