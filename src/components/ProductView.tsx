import { useState } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { Book } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import {
  Dialog,
  DialogContent,
} from "../components/ui/dialog";
import { toast } from 'react-toastify';

interface ProductViewProps {
  book: Book;
  onClose: () => void;
}

export default function ProductView({ book, onClose }: ProductViewProps) {
  const { addToCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please login to unlock exclusive offers");
      return;
    }
    addToCart(book);
    alert("Item added to cart");
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
    <DialogContent className='max-w-[1000px]'>
        <div className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h2>
              <p className="text-lg text-gray-600 mb-4">by {book.author}</p>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={i < 4 ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="ml-2 text-gray-600">(4.0)</span>
              </div>

              <div className="text-2xl font-bold text-primary-600 mb-6">
                {formatPrice(book.price)}
              </div>

              <p className="text-gray-600 mb-6">
                {book.description}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <div className="space-y-4">
                <button
                  onClick={(e) => handleAddToCart(e)}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex">
                    <dt className="text-gray-500 w-24">Category:</dt>
                    <dd className="text-gray-900">{book.category}</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-gray-500 w-24">ISBN:</dt>
                    <dd className="text-gray-900">978-1234567890</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-gray-500 w-24">Pages:</dt>
                    <dd className="text-gray-900">324</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-gray-500 w-24">Language:</dt>
                    <dd className="text-gray-900">English</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
    </DialogContent>
    </Dialog>
  );
}