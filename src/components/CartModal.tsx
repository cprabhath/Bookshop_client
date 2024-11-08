import { Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import { Dialog, DialogContent, DialogHeader } from "../components/ui/dialog";
import AxiosInstance from "../lib/AxiosInstence";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "../hooks/use-toast";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stripePromise = loadStripe(
  import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { toast } = useToast();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  if (!isOpen) return null;

  const handlePayments = async () => {
    try {
      const response = await AxiosInstance.post("/payments/create-checkout-session", {
        cartItems: cartItems.map(item => ({
          productName: item.title, // Make sure this matches your item property
          amount: item.price, // Assuming price is in dollars
          quantity: item.quantity,
        })),
      });
  
      const { sessionId } = response.data;
  
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        toast({
          title: "Stripe initialization failed.",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again",
        variant: "destructive",
      });
      console.error("Error creating checkout session", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Your Cart</h2>
        </DialogHeader>
        <div className="relative bg-white rounded-lg max-w-lg w-full p-2">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-gray-600 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-lg font-bold mb-4 ">
                  <span>Grand Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button onClick={handlePayments} className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors flex gap-2 items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
