import { Book } from "../types";
import AxiosInstance from "../lib/AxiosInstence";
import { useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";

const useBooks = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([
    {
      id: '7',
      title: 'The Midnight Library',
      author: {
        name: 'Matt Haig',
      },
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
      description: 'Between life and death there is a library, and within that library, the shelves go on forever.',
      category: {
        name: 'Fiction'
      },
      isbn: '9780143134963',
      qty: 10,
      discount: 10
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: {
        name: 'James Clear',
      },
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
      description: 'Transform your life with tiny changes that lead to remarkable results.',
      category: {
        name: 'Self-Help'
      },
      isbn: '9780735211292',
      qty: 5,
      discount: 0
    },
    {
      id: '3',
      title: 'Project Hail Mary',
      author: {
        name: 'Andy Weir',
      },
      price: 27.99,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
      description: 'A lone astronaut must save humanity from a catastrophic extinction event.',
      category: {
        name: 'Science Fiction'
      },
      isbn: '9780593135204',
      qty: 7,
      discount: 15
    },
    {
      id: '4',
      title: 'The Psychology of Money',
      author: {
        name: 'Morgan Housel',
      },
      price: 21.99,
      image: 'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80&w=800',
      description: 'Timeless lessons on wealth, greed, and happiness.',
      category: {
        name: 'Finance'
      },
      isbn: '9780857197689',
      qty: 2,
      discount: 0
    },
    {
      id: '5',
      title: 'The Silent Patient',
      author: {
        name: 'Alex Michaelides',
      },
      price: 23.99,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
      description: "A woman's act of violence against her husband, and the therapist obsessed with uncovering her motive.",
      category: {
        name: 'Mystery'
      },
      isbn: '9781250301697',
      qty: 3,
      discount: 0
    },
    {
      id: '6',
      title: 'Dune',
      author: {
        name: 'Frank Herbert',
      },
      price: 25.99,
      image: 'https://images.unsplash.com/photo-1465929639680-64ee080eb3ed?auto=format&fit=crop&q=80&w=800',
      description: 'A stunning blend of adventure and mysticism, environmentalism and politics.',
      category: {
        name: 'Science Fiction'
      },
      isbn: '9780441172719',
      qty: 4,
      discount: 0
    }
  ]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await AxiosInstance.get("/Book");
        const mappedBooks = response.data.map((item: Book) => ({
          id: item.id,
          title: item.title,
          author: item.author,
          price: item.price,
          image: item.image,
          description: item.description,
          category: item.category,
          isbn: item.isbn,
          qty: item.qty,
          discount: 0
        }));
        setBooks((prevBooks) => [...prevBooks, ...mappedBooks]);
      } catch (error) {
        if(error.response.status == 404){
          toast({
            title: "No books found",
            description: "No books found in the database",
            variant: "destructive"
          });
          return;
        }
        toast({
          title: "Error",
          description: "An error occurred while fetching books",
          variant: "destructive"
        });
        console.error(error);
      }
    }
    fetchBooks();
  }, [toast]);

  return books;
};

export default useBooks;
