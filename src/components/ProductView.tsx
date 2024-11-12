import { ShoppingBag, Star } from "lucide-react";
import { Book } from "../types";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import { useAuth } from "../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { useToast } from "../hooks/use-toast";

interface ProductViewProps {
  book: Book;
  onClose: () => void;
}

export default function ProductView({ book, onClose }: ProductViewProps) {
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[1000px]">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {book.title}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                by {book.author.name}
              </p>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
                <span className="ml-2 text-gray-600">(4.0)</span>
              </div>

              <div className="text-2xl font-bold text-primary-600 mb-6">
                {formatPrice(book.price)}
              </div>

              <p className="text-gray-600 mb-6">
                {
                  book.description ? book.description : "No description available"
                }               
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
                <h3 className="font-semibold text-gray-900 mb-2">
                  Product Details
                </h3>
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex">
                    <dt className="text-gray-500 w-24">Category:</dt>
                    <dd className="text-gray-900">{book.category.name}</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-gray-500 w-24">ISBN:</dt>
                    <dd className="text-gray-900">{book.isbn}</dd>
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
