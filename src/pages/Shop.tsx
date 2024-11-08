import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import { getBooks } from "../data/books";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShopFilters from "../components/ShopFilters";
import ProductView from "../components/ProductView";
import { Book } from "../types";
import Spinner from "../components/Spinner";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBooks = await getBooks(); 
        setBooks(fetchedBooks); 
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const categoryStrings = books.map((book) => {
    if (typeof book.category === "string") {
      return book.category;
    } else if (book.category && typeof book.category.name === "string") {
      return book.category.name;
    } else {
      return "Unknown";
    }
  });

  const categories = ["All", ...new Set(categoryStrings)];
  const booksPerPage = 9;

  useEffect(() => {
    const bookId = searchParams.get("book");
    if (bookId) {
      const book = books.find((b) => b.id === bookId);
      if (book) setSelectedBook(book);
    }
  }, [books, searchParams]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Apply filters and sorting
  const filteredBooks = books
    .filter(
      (book) =>
        (selectedCategory === "All" ||
          book.category?.name === selectedCategory) &&
        book.price >= priceRange[0] &&
        book.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const displayedBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  const handleFilterChange = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, sortBy, priceRange]);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
    {loading ? (
      <Spinner />
    ) : (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 p-2">
            Our Collection
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <ShopFilters
              sortBy={sortBy}
              onSortChange={setSortBy}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            >
              {displayedBooks.map((book) => (
                <div key={book.id} onClick={() => setSelectedBook(book)}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-primary-500 text-white hover:bg-primary-600"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      1
                    </button>
                    {currentPage > 4 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                  </>
                )}

                {getPageNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`px-4 py-2 rounded-md transition-all duration-300 ${
                      currentPage === number
                        ? "bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-primary-500 text-white hover:bg-primary-600"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + booksPerPage, filteredBooks.length)} of{" "}
              {filteredBooks.length} books
            </div>
          </div>
        </div>

        {/* Product View Modal */}
        {selectedBook && (
          <ProductView
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </main>
    </>
    )}
    </>
  );
}
