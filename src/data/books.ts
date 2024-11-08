import AxiosInstance from "../lib/AxiosInstence";
import { Book } from "../types";

let books: Book[] = [];

async function fetchBooks() {
  try {
    const response = await AxiosInstance.get("/Book");
    console.log(response.data.$values);
    books = response.data.$values.map((item: Book) => ({
      id: item.id.toString(),
      title: item.title,
      author: item.author || "Unknown",
      price: item.price,
      image: item.image,
      description: item.description,
      category: item.category || "Unknown",
      discount: item.discount,
    }));
  } catch (error) {
    alert("Error fetching books");
    console.error(error);
  }
}


async function getBooks() {
  if (books.length === 0) {
    await fetchBooks();

    console.log(books);
  }
  return books;
}

export { getBooks };
