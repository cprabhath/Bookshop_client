import React, { useEffect, useState } from "react";
import { Book } from "../types";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "../utils/format";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../context/AuthContext";
import AxiosInstance from "../lib/AxiosInstence";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [ OutOfStock, setOutOfStock ] = useState(false);
  const { isLoggedIn } = useAuth();
  const discount = book.discount || 10;

  useEffect(() => {
    AxiosInstance.get(`/Book/${book.id}`)
      .then((response) => {
        book.qty = response.data.qty;
      })
      .catch(() => {
        book.qty = 0;
      });
    if (book.qty < 0 || book.qty === 0) {
      setOutOfStock(true);
    }
  }, [book, book.qty]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please login to add items to cart",
        variant: "info",
      });
      return;
    }
    addToCart(book);
    toast({
      title: "Item added to cart",
      description: `${book.title} has been added to your cart`,
      variant: "success",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative pb-[60%]">
        {discount > 0 && (
          <div className="z-10 absolute top-2 right-2 bg-gradient-to-r from-red-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            {discount}% OFF
          </div>
        )}

        {OutOfStock && (
          <div className="z-10 absolute top-2 right-2 bg-gradient-to-r from-red-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            Out of Stock
          </div>
        )}
        <img
          src={book.image}
          alt={book.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author.name}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {book.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            {discount > 0 ? (
              <div className="space-y-1">
                <span className="text-lg font-bold text-primary-600">
                  {formatPrice(book.price * (1 - discount / 100))}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary-600">
                {formatPrice(book.price)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => handleAddToCart(e)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              OutOfStock 
                ? "bg-red-600 text-white opacity-60 cursor-not-allowed disabled:opacity-60" 
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={OutOfStock}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
