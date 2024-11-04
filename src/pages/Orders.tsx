import { Package, Truck, CheckCircle, Clock, ShoppingBag, Undo2, MessageCircleHeart } from "lucide-react";
import { formatPrice } from "../utils/format";
import { useState } from "react";
import FeedbackModel from "../components/FeedbackModel";

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-03-15",
    total: 89.97,
    status: "Delivered",
    items: [
      {
        id: "1",
        title: "The Midnight Library",
        price: 24.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: "2",
        title: "Atomic Habits",
        price: 19.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-03-10",
    total: 47.98,
    status: "In Transit",
    items: [
      {
        id: "3",
        title: "Project Hail Mary",
        price: 27.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: "4",
        title: "The Psychology of Money",
        price: 19.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80&w=200",
      },
    ],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case "In Transit":
      return <Truck className="h-6 w-6 text-primary-500" />;
    default:
      return <Clock className="h-6 w-6 text-gray-500" />;
  }
};

export default function Orders() {

  const [openFeedback, setOpenFeedback] = useState(false);

  return (
    <>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <div className="flex items-center space-x-2 text-gray-500">
          <Package className="h-5 w-5" />
          <span>{orders.length} orders</span>
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order {order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on {order.date}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium">{order.status}</span>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 -mx-6 px-6 py-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center py-4 first:pt-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <button className="flex items-center bg-primary-600 p-3 rounded-md text-white font-medium text-sm me-2 hover:bg-primary-900">
                    <ShoppingBag className="h-4 w-4 mx-2" />
                    View Order Details
                  </button>
                  {order.status === "Delivered" && (
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center bg-red-600 text-white p-3 rounded-md font-medium text-sm hover:bg-red-900">
                        <Undo2 className="h-4 w-4 mx-2" />
                        Return your order
                      </button>
                      <button 
                      onClick={() => setOpenFeedback(true)}
                      className="flex items-center bg-green-700 text-white p-3 rounded-md font-medium text-sm hover:bg-green-900">
                        <MessageCircleHeart className="h-4 w-4 mx-2" />
                        We want to hear from you!
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Order Total</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
      
      <FeedbackModel 
        isOpen={openFeedback}
        onClose={() => setOpenFeedback(false)}
      />
    </>
  );
}
