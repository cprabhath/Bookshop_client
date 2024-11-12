import { Search, X, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import useBooks from '../data/books';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';

export default function SearchBox() {
  const books = useBooks();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleCloseResults();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Clear previous timeout for debouncing
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchQuery.trim()) {
      setIsLoading(true);
      // Debounced search with a 300ms delay
      searchTimeout.current = setTimeout(() => {
        const query = searchQuery.trim().toLowerCase();
        const queryTokens = query.split(' '); // Split into words

        const filtered = books.filter((book) => {
          const title = book.title.toLowerCase();
          const author = book.author?.name ? book.author.name.toLowerCase() : '';
          const category = book.category?.name ? book.category.name.toLowerCase() : '';

          // Check if all query tokens are present in either title or author
          return queryTokens.every(
            (token) => title.includes(token) || author?.includes(token) || category.includes(token)
          );
        });

        setSearchResults(filtered);
        setShowResults(true);
        setIsLoading(false);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsLoading(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [books, searchQuery]);

  const handleCloseResults = () => {
    setShowResults(false);
    if (!searchQuery) {
      setIsExpanded(false);
    }
  };

  const handleBookClick = (bookId: string) => {
    handleCloseResults();
    setSearchQuery('');
    navigate(`/shop?book=${bookId}`);
  };

  return (
    <div ref={searchRef} className="relative">
      <div
        className={`flex items-center transition-all duration-300 ${
          isExpanded ? 'w-64 md:w-96' : 'w-10'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => !searchQuery && setIsExpanded(false)}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search
              className={`h-5 w-5 text-gray-400 transition-opacity duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-70'
              }`}
            />
          )}
        </div>
        <input
          type="text"
          placeholder={isExpanded ? 'Search by Book name, author, or category' : ''}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsExpanded(true);
            if (searchQuery) setShowResults(true);
          }}
          className={`w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-primary-500 transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <div
        className={`absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-hidden transition-all duration-300 ${
          showResults ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="overflow-y-auto max-h-96">
          {isLoading ? (
            <div className="p-8 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2 animate-pulse">
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                <div className="w-24 h-3 bg-gray-100 rounded"></div>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((book, index) => (
                <div
                  key={book.id}
                  onClick={() => handleBookClick(book.id)}
                  className={`flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-00 animate-fadeIn`}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                      {book.title}
                    </h4>
                    <p className="text-sm text-gray-500">{book.author.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 animate-fadeIn">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
